<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('cart/addtest/{id}/{quantity}', 'CartController@addTest')->name('cartAddTest'); */
Route::group(['as' => 'admin::', 'prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => 'admin'], function () {
	Route::get('pages', 'PageController@index')->name('pages');
	Route::get('pages-views/{test?}', 'PageController@pagesViews')->where('test', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('pagesViews');
	Route::get('page/create', 'PageController@create')->name('pageCreate');	
	Route::get('page/edit/{id}', 'PageController@edit')->name('pageEdit');
	Route::post('page/store', 'PageController@store')->name('pageStore');	
	Route::post('page/update', 'PageController@update')->name('pageUpdate');	
	Route::post('page/publish', 'PageController@publish')->name('pagePublish');	
	Route::post('page/get', 'PageController@get')->name('pageGet');	
	Route::post('pages/title-or-uri/search-data', 'PageController@searchData')->name('pagesSearchData');
	Route::post('pages/all/{page?}', 'PageController@all')->name('pagesAll');	
	Route::post('pages-views/order-by/{column}/order/{order}/{page?}', 'PageController@sortOrder')->name('pagesSortOrder');			
	
	Route::get('menu-categories', 'Menu_categoryController@index')->name('menu_categories');
	Route::get('menu-items', 'Menu_itemController@index')->name('menu_items');
	Route::post('menu-items/save', 'Menu_itemController@save')->name('menu_itemsSave');
	Route::post('menu-items/all', 'Menu_itemController@all')->name('menu_itemsAll');

	Route::get('products/{page?}', 'ProductController@index')->name('products');
	Route::get('product/group-products/{page?}', 'ProductController@showGroupProducts')->name('productShowGroupProducts');	
	Route::get('product/create', 'ProductController@create')->name('productCreate');	
	Route::get('product/edit/{id}', 'ProductController@edit')->name('productEdit');
	Route::get('plinth/create', 'ProductController@createPlinth')->name('productCreatePlinth');	
	Route::get('plinth/edit/{id}', 'ProductController@editPlinth')->name('productEditPlinth');		
	Route::get('substrate/create', 'ProductController@createSubstrate')->name('productCreateSubstrate');	
	Route::get('substrate/edit/{id}', 'ProductController@editSubstrate')->name('productEditSubstrate');	
	Route::get('product/create-for-group', 'ProductController@createForGroup')->name('productCreateForGroup');
	Route::get('product/edit-for-group/{id}', 'ProductController@editForGroup')->name('productEditForGroup');		
	Route::post('product/upload-images', 'ProductController@uploadImages')->name('productUploadImages');
	Route::post('product/store', 'ProductController@store')->name('productStore');	
	Route::post('product/update', 'ProductController@update')->name('productUpdate');	
	Route::post('product/destroy', 'ProductController@destroy')->name('productDestroy');		
	Route::post('product/destroy-group-product', 'ProductController@destroyGroupProduct')->name('productDestroyGroupProduct');	
	Route::post('product/publish', 'ProductController@publish')->name('productPublish');		
	Route::post('product/update-publication', 'ProductController@updatePublication')->name('productUpdatePublication');
	Route::post('product/store-group-product', 'ProductController@storeGroupProduct')->name('productStoreGroupProduct');		
	Route::post('product/update-group-product', 'ProductController@updateGroupProduct')->name('productUpdateGroupProduct');		
	Route::post('plinth/store', 'ProductController@storePlinth')->name('productStorePlinth');	
	Route::post('plinth/update/{id}', 'ProductController@updatePlinth')->name('productUpdatePlinth');		

	
	Route::get('product-groups/{page?}', 'Product_groupController@index')->name('productGroups');	
	Route::get('product-group/create', 'Product_groupController@create')->name('productGroupCreate');	
	Route::get('product-group/edit/{id}', 'Product_groupController@edit')->name('productGroupEdit');	
	Route::post('product-group/upload-images', 'Product_groupController@uploadImages')->name('productGroupUploadImages');
	Route::post('product-group/store', 'Product_groupController@store')->name('productGroupStore');	
	Route::post('product-group/update', 'Product_groupController@update')->name('productGroupUpdate');	
	Route::post('product-group/destroy', 'Product_groupController@destroy')->name('productGroupDestroy');		
	Route::post('product-group/publish', 'Product_groupController@publish')->name('productGroupPublish');		
	Route::post('product-group/update-publication', 'Product_groupController@updatePublication')->name('productGroupUpdatePublication');			

	Route::get('categories/{page?}', 'CategoryController@index')->name('categories');
	Route::post('category/get-uri', 'CategoryController@getUri')->name('categoryGetUri');
	Route::post('category/get', 'CategoryController@get')->name('categoryGet');	
	Route::post('category/update-order', 'CategoryController@updateOrder')->name('categoryUpdateOrder');	
	Route::post('category/upload-image', 'CategoryController@uploadImage')->name('categoryUploadImage');		
	Route::post('category/store', 'CategoryController@store')->name('categoryStore');	
	Route::post('category/update', 'CategoryController@update')->name('categoryUpdate');	
	
	Route::get('services/{page?}', 'ServiceController@index')->name('services');
	Route::get('service/create', 'ServiceController@create')->name('serviceCreate');	
	Route::get('service/edit/{id}', 'ServiceController@edit')->name('serviceEdit');	
	Route::post('service/store', 'ServiceController@store')->name('serviceStore');	
	Route::post('service/update', 'ServiceController@update')->name('serviceUpdate');		
	
	Route::get('orders/{page?}', 'OrderController@index')->name('orders');
	Route::get('order/{id}', 'OrderController@show')->name('order');
	
	Route::get('parse', 'ParseController@parse')->name('parse');	
	Route::get('parse-form', 'ParseController@showForm')->name('showForm');
	Route::get('parse-collection-form', 'ParseController@parseCollectionForm')->name('parseCollectionForm');
	Route::post('parse-collection', 'ParseController@parseCollection')->name('parseCollection');
	Route::post('load-images', 'ParseController@loadImages')->name('loadImages');
});

Route::group(['as' => 'editor::', 'prefix' => 'editor', 'namespace' => 'Editor', 'middleware' => 'editor'], function () {
	Route::get('', 'ProductController@mainPage')->name('mainPage');
	Route::get('category/edit/{id}', 'CategoryController@edit')->name('editCategory');
	Route::get('product/edit/{id}', 'ProductController@edit')->name('editProduct');
	Route::post('product/update', 'ProductController@update')->name('updateProduct');
	Route::post('product/change-prices', 'ProductController@updatePrices')->name('updatePrices');
	Route::post('category/search', 'CategoryController@search')->name('searchProduct');
});
Route::post('feedback', 'FeedbackController@send')->name('feedbackSend');

Route::post('cart/add', 'CartController@add')->name('cartAdd');
Route::post('cart/add-service', 'CartController@addService')->name('cartAddService');
Route::post('cart/multiple-add', 'CartController@multipleAdd')->name('cartMultipleAdd');
Route::post('cart/get', 'CartController@get')->name('cartGet');
Route::post('cart/remove', 'CartController@remove')->name('cartRemove');
Route::post('cart/remove-service', 'CartController@removeService')->name('cartRemoveService');
Route::post('cart/get-all', 'CartController@getAll')->name('cartGetAll');
Route::post('cart/add-to-order', 'CartController@addToOrder')->name('cartAddToOrder');
Route::post('cart/checkout', 'CartController@checkout')->name('cartCheckout');
Route::post('cart/print-order', 'CartController@printOrder')->name('cartPrintOrder');
Route::get('cart/clear', 'CartController@clear')->name('cartClear');
Route::get('cart/order', 'CartController@order')->name('cartOrder');
/* Route::get('cart/get', 'CartController@get')->name('cartGet'); */

Route::get('cart', 'CartController@index')->name('cart');
Route::get('search/{name}/{page?}', 'ProductController@search')->name('search');
Route::post('products/search-data', 'ProductController@searchData')->name('productsSearchData');	
Route::post('products/filter/{properties}', 'ProductController@filter')->where('properties', '[а-яА-Я a-zA-Z &/= \- + 0-9]+')->name('productsFilter');		
Route::post('products/{properties}', 'ProductController@get')->where('properties', '[а-яА-Я a-zA-Z &/= \- + 0-9]+')->name('productsGet');	


/* Route::get('{uri?}', 'View_relationController@test')->where('uri', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('view_relation'); */

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group([ 'middleware' => 'page'], function () {
	Route::get('{categories?}', 'CategoryController@show')->where('categories', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('categories');
	Route::get('{product?}', 'ProductController@show')->where('product', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('product');
	Route::get('{laminateProduct?}', 'ProductController@showLaminateProduct')->where('laminateProduct', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('laminateProduct');
	Route::get('{vinil?}', 'ProductController@showVinil')->where('vinil', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('vinil');
	Route::get('{parquet?}', 'ProductController@showLaminateProduct')->where('parquet', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('parquet');
	Route::get('{glue?}', 'ProductController@showGlue')->where('glue', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('glue');	
	Route::get('{productGroup?}', 'ProductController@showGroup')->where('productGroup', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('productGroup');
	Route::get('{contactsPage?}', 'PageController@contacts')->where('mainPage', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('contactsPage');
	Route::get('{mainPage?}', 'PageController@main')->where('mainPage', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('mainPage');
	Route::get('{page?}', 'PageController@show')->where('page', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('page');
	Route::get('{products?}', 'ProductController@index')->where('products', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('products');
	
	Route::get('{stock?}', 'ProductController@stock')->where('stock', '[а-яА-Я a-zA-Z / \- + 0-9]+')->name('stock');
});


/* DB::listen(function($query) {
    var_dump($query->sql, $query->bindings);
}); */





