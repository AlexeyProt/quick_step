<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
/* Загрузчик данных */
class DataLoader
{	
	protected $sqlVar;

	protected $nodeLists = array(); // Массив списков объектов узлов
	
	protected $queryData = array(); // Массив данных для составления запросов
	
	protected $doc = null; // object DOMDocument с контентом, в который нужно загрузить данные
	
	protected $finder = null; // object DomXPath для поиска узлов
	
	public function __construct(SqlVar $sqlVar) {
		$this->sqlVar = $sqlVar;
	}
	// Устанавливает $this->doc с содержимым $content
	// $content - string
	public function setContent( $content ) {
		$this->doc = new \DOMDocument();	
		$this->doc->loadHTML('<html><body>'.mb_convert_encoding($content, 'HTML-ENTITIES', "UTF-8").'</body></html>', LIBXML_HTML_NODEFDTD);		
		$this->finder = new \DomXPath( $this->doc );
	}

	private function setNodeValue( $node, $value ) {
		$node->nodeValue = $value;
	}
	private function setNodeAttr( $node, $value, $attribute ) {
		$node->setAttribute($attribute, $value);
	}	
	private function setNodeAttrPref( $node, $value, $attribute, $prefix ) {
		$node->setAttribute($attribute, $prefix.$value);
	}		
	// Добавляет узлы в массив $this->nodeLists и соответствующие им данные в массив $this->queryData
	// string $attribute - название атрибутов вида 'data-class-requestedField-searchField'
	// string $queryStr XPath выражение для поиска узлов
	// string $method метод вставки данных в узел
	// string $contentAttr - название атрибутов (указанные в атрибуте data-attr) в которые нужно загрузить данные	
	// string $prefix - префикс атрибута в который будут загружены данные
	private function addNodes( $attribute, $queryStr, $method, $contentAttr=null, $prefix=null ) {
		$nodes = $this->finder->query($queryStr);
		if ( $nodes->length == 0 ) return;	
		$segmentsAttr = explode('-', $attribute);
		$searchField = array_pop($segmentsAttr);
		$requestedField = array_pop($segmentsAttr);
		$table = array_pop($segmentsAttr);
		for ( $i = 0; $i < $nodes->length; $i++ ) {
			$this->queryData[$table][$requestedField][$searchField][$nodes->item($i)->getAttribute($attribute)] = $nodes->item($i)->getAttribute($attribute);
			$this->nodeLists[$table][$requestedField][$searchField][$nodes->item($i)->getAttribute($attribute)][] = array( 'node' => $nodes->item($i), 'method' => $method, 'contentAttr' => $contentAttr, 'prefix' => $prefix );
		}			
	}
	// Возвращает строку sql для функции IN() с полем для поиска и псевдопеременными
	// Строка вида "field IN (:field1, :field2)", где field имя поля
	// @param string $table
	// @param array $searchField
/* 	protected function getSearchFieldIN ( $table, array $searchField ) {
		$string = '';
		$field = key($searchField);
		$i = 0;
		$sqlVars = [];
		foreach ( $searchField[$field] as $value ) {			
			$string .= ":". $field. $i . ", ";
			$sqlVars[$field.$i] = $value;
			$i++;
		}
		$string = substr($string, 0, -2);
		return [ 'str' => "$table.$field IN ($string)", 'sqlVars' => $sqlVars ]; // Должен возвращать только строку "$table.$field IN ($string)"!!!
	}	 */	
	
	protected function getListByField($table, $requestedField, $select) {
		$this->sqlVar->set($table, $requestedField);
		$select = "$select, ".key($requestedField);		
		$sql = "SELECT $select FROM ".$table." WHERE ".$this->sqlVar->getSearchFieldIN();
		$conn = DB::connection()->getPdo();
		$st = $conn->prepare($sql);
		$st->execute( $this->sqlVar->searchField );
		$list = array();
		while ( $row = $st->fetch() ) {
			$list[$row[key($requestedField)]] = (object) $row;
		}		
		return $list;
	}
	// Добавляет узлы в массив $this->nodeLists и соответствующие им данные в массив $this->queryData
	// После загрузки данные установятся в занчения узлов
	// string $attribute - название атрибутов вида 'data-class-requestedField-searchField'
	public function addNodesVal( $attribute ) {
		$this->addNodes( $attribute, "//*[@$attribute and not(@data-attr)]", 'setNodeValue' );
	}
	// Добавляет узлы в массив $this->nodeLists и соответствующие им данные в массив $this->queryData
	// После загрузки данные установятся в атрибуты $contentAttr
	// string $attribute - название атрибутов вида 'data-class-requestedField-searchField'
	// string $contentAttr - название атрибутов (указанные в атрибуте data-attr) в которые нужно загрузить данные	
	// string $prefix - префикс атрибута в который будут загружены данные
	public function addNodesAttr( $attribute, $contentAttr, $prefix=null ) {
		$method = ( $prefix ) ? 'setNodeAttrPref' : 'setNodeAttr';
		$this->addNodes( $attribute, "//*[@$attribute and @data-attr=\"$contentAttr\"]", $method, $contentAttr, $prefix );
	}	
	// Загружает данные из массива $this->queryData в узлы из массива $this->nodeLists
	// Возращает контент с загружеными данными
	public function load() {
		// Формируется ключ $select массива $this->queryData[$table] с запрашиваемыми полями
		foreach ( $this->queryData as $table => $tableValue ) {
			$requestedFields = array();
			foreach ( $tableValue as $requestedField => $requestedValue ) {
				foreach ( $requestedValue as $searchField => $searchValues ) {
					foreach ( $searchValues as $searchValue ) {
						if ( isset( $requestedFields[$searchValue] ) ) {
							$select = "$requestedFields[$searchValue], $requestedField";
							$this->queryData[$table][$select][$searchField][$searchValue] = $searchValue;						
							unset( $this->queryData[$table][$requestedFields[$searchValue]][$searchField][$searchValue], $this->queryData[$table][$requestedField][$searchField][$searchValue] );
							if ( empty( $this->queryData[$table][$requestedFields[$searchValue]][$searchField] ) ) unset( $this->queryData[$table][$requestedFields[$searchValue]] );
							if ( empty( $this->queryData[$table][$requestedField][$searchField] ) ) unset( $this->queryData[$table][$requestedField] );
							$requestedFields[$searchValue] = $select;				
						}
						else {
							$requestedFields[$searchValue] = $requestedField;
						}
					}					
				}
			}
		}
		foreach ( $this->queryData as $table => $tableValue ) {
			// Выполняются запросы
			foreach ( $tableValue as $select => $requestedValue ) {
				$model = app()->make('App\\'.ucfirst($table));
				$objs = $this->getListByField( $model->getTable(), $requestedValue, $select );
				$requestedFields = explode(', ', $select);
				foreach( $objs as $obj ) {
					foreach ( $requestedFields as $requestedField ) {
						foreach ( $requestedValue as $searchField => $searchValues ) {
							// Данные вставляются в соответствующие узлы
							foreach ( $this->nodeLists[$table][$requestedField][$searchField][$obj->{$searchField}] as $node ) {		
								call_user_func_array( array( $this, $node['method'] ), array( $node['node'],  $obj->{$requestedField}, $node['contentAttr'], $node['prefix'] ) );
							}							
						}						
					}
				}
			}
		}
		return $this->getContent();
	}
	// Удаляет значения узлов с атрибутами $attribute
	// Если указан $contentAttr то очищает значение атрибута $contentAttr
	// string $attribute - название атрибутов вида 'data-class-requestedField-searchField'
	// string $contentAttr - название атрибутов (указанные в атрибуте data-attr) в которых нужно очистить данные	
	public function clearNodes( $attribute, $contentAttr=null ) {
		if ( $contentAttr ) {
			$queryStr = "//*[@$attribute and @data-attr=\"$contentAttr\"]";
			$method = 'setNodeAttr';
		}
		else {
			$queryStr = "//*[@$attribute and not(@data-attr)]";
			$method = 'setNodeValue';
		}		
		$nodes = $this->finder->query($queryStr);
		for ( $i = 0; $i < $nodes->length; $i++ ) {
			call_user_func_array( array( $this, $method ), array( $nodes->item($i),  '', $contentAttr ) );
		}
	}
	
	public function getContent() {
		return html_entity_decode(substr(trim($this->doc->saveHTML()),12,-14));
	}
}
