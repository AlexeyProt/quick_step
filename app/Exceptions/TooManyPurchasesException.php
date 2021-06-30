<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\Collection;
/**
 * Некотрых товаров куплено больше, чем есть в наличии
 */
class TooManyPurchasesException extends Exception
{
	/**
	 * Товары добавленные в корзину
	 * @var Collection
	 */	
	public $products;
	
	/**
	 * @param Collection $products
	 */
	public function __construct(Collection $products)
	{
		$this->products = $products;
	}	
    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
		return response()->json($this->products->toJson(), 500);
    }
}
