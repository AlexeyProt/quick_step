<?php

namespace App\Services;
/* Класс создания переменных для строки sql */
class SqlVar
{
	
	public $table = null; // Название таблицы
	
	public $fields = array(); // Поля таблицы
	
	public $searchField = array(); // Поле, по которому производится поиск
	
	public $sqlVars = array(); // Переменные, подставляемые в sql запрос
	
	public function set ( $tableName=null, $searchField=array(), $fieldsNames = array() ) {
		$this->setTable( $tableName );
		$this->setSearchField( $searchField );
		$this->setFields( $fieldsNames );		
	}
	// Тестоый метод
	public function setProperties ($properties) {
		foreach( $properties as $key => $nameProperty ) {
			$this->{$key} = $nameProperty;
		}
	}
	// Если $tableName строка, то устванавливает свойству $this->table значение $tableName
	public function setTable ($tableName) {
		if ( is_string($tableName) ) $this->table = $tableName;
	}
	// Если $fieldsNames массив, то устванавливает свойству $this->fields значение $fieldsNames
	public function setFields ($fieldsNames) {
		if ( is_array($fieldsNames) ) $this->fields = $fieldsNames;
	}
	// Если $searchField массив, то устванавливает свойству $this->searchField значение $searchField
	public function setSearchField ($searchField) {
		if ( is_array($searchField) ) $this->searchField = $searchField;
	}
	// Получает переменные sql
	public function getSqlVars () {
		if ( is_array( $this->sqlVars ) ) {
			$this->sqlVars += $this->searchField + $this->fields;
			return $this->sqlVars;
		}
	}
	public function getFieldsStr () {
		$string = '';
		foreach( $this->fields as $field => $value ) {
			$string .= "$this->table.$field=:$field, ";
		}
		return substr($string, 0, -2);
	}
	public function getWhere ( $condition ) {
		$string = '';
		foreach( $this->searchField as $field => $value ) {
			$string .= "$this->table.$field $condition :$field AND ";
		}
		return substr($string, 0, -5);
	}	
	// Возвращает строку sql с полем для поиска и условием поиска $condition
	// Строка вида "table.field = :field", где field имя поля
	public function getSearchFieldStr ( $condition ) {
		return $this->table.'.'.key($this->searchField)." $condition :".key($this->searchField);
	}
	// Возвращает строку sql для функции IN() с полем для поиска и псевдопеременными
	// Строка вида "field IN (:field1, :field2)", где field имя поля,	
	// создает массив sql переменных $this->sqlVars = array( 'field1' => 'value' ) с полями field1 и их значениями value
	// Устанавливает $this->searchField = $this->sqlVars
	public function getSearchFieldIN () {
		$string = '';
		$field = key($this->searchField);
		$this->searchField[$field] = (array) $this->searchField[$field];
		$this->sqlVars = [];
		$i = 0;
		foreach ( $this->searchField[$field] as $value ) {			
			$string .= ":". $field. $i . ", ";
			$this->sqlVars[$field.$i] = $value;
			$i++;
		}
		$string = substr($string, 0, -2);
		$this->searchField = $this->sqlVars;
		return "$this->table.$field IN ($string)";
	}	
	// Возвращает строку для подстановки в sql после SET с переменными полученными из запроса
	// Строка вида "`field1`=:field1, `field2`=:field2", где field имя поля,
	// создает массив sql переменных $this->sqlVars = array( 'field' => 'value' ) с полями field и их значениями value
	// по параметрам $allowed ( допустимые поля ) и $source ( поля полученные из запроса )
	public function pdoSet( $allowed, $source = array() ) {
		$set = '';
		$this->sqlVars = $this->searchField;
		foreach ( $allowed as $field ) {
			if ( isset($source[$field]) ) {
				$set.="`".str_replace("`","``",$field)."`". "=:$field, ";
				$this->sqlVars[$field] = $source[$field];
			}
		}
		return substr($set, 0, -2);
	}
	// Возвращает строку для подстановки в sql после WHERE с переменными полученными из запроса
	// Строка вида "`field1`=:field1 AND `field2`=:field2", где field имя поля,
	// создает массив sql переменных $this->sqlVars = array( 'field' => 'value' ) с полями field и их значениями value
	// по параметрам $allowed ( допустимые поля ) и $source ( поля полученные из запроса )
	public function pdoWhere( $allowed, $source = array() ) {
		$set = '';
		$this->sqlVars = array();
		foreach ( $allowed as $field ) {
			if ( isset($source[$field]) ) {
				$set.="`".str_replace("`","``",$field)."`". "=:$field AND ";
				$this->sqlVars[$field] = $source[$field];
			}
		}
		return substr($set, 0, -5);
	}		
}
