<?php

namespace App\Services;

use App\Page;
use App\Services\DataLoader;

class PageService
{
	protected $page;
	
    protected $dataLoader;
	
	public function __construct(Page $page, DataLoader $dataLoader) {
		$this->page = $page;
		$this->dataLoader = $dataLoader;
	}
	
	public function setLoadNodes() {
		$this->dataLoader->addNodesVal( 'data-product-name_product-id_product' );
		$this->dataLoader->addNodesVal( 'data-product-alt_name_product-id_product' );
		$this->dataLoader->addNodesVal( 'data-product-content-id_product' );		
		$this->dataLoader->addNodesVal( 'data-price-price-id_product' );
		$this->dataLoader->addNodesAttr( 'data-main_image-name_image-id_product', 'src', 'http://'.$_SERVER['HTTP_HOST'].'/images/products/' );		
	}
	
	public function get($uri) {
		$page = $this->page->find($uri);
		$this->dataLoader->setContent($page->content);
		$this->setLoadNodes();
		$page->content = $this->dataLoader->load();
		return $page;
	}
}
