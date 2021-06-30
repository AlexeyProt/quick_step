<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Page;
use App\Sale;
use App\Services\SaleService;
use App\Services\PaginationService;

class OrderController extends Controller
{
	public $sale;
	
	public function __construct(Sale $sale) {
		$this->sale = $sale;
	}
	
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(PaginationService $paginationService)
    {
		$page = new Page();
		$page->title = 'Заказы';
		$page->description = 'Заказы';		
		$sales = $this->sale->with('customer', 'magazine_sales.product', 'magazine_sales.price_history', 'sale_status.status');
		
		$paginationService->addBuilder($sales);
		$sales = $paginationService->paginate(15);
		
		return view('admin.pages.orders', ['page' => $page, 'orders' => $sales]);		
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, SaleService $saleService)
    {
		$sale = $this->sale->findOrFail($id);
			
		$sale = $saleService->attributes($sale);	
		$sale = $saleService->sortCategories($sale, ['Ламинат', 'Подложка', 'Герметик', 'Плинтус']);
		
		$page = new Page();
		$page->title = "Заказ № $sale->id";
		$page->description = "Заказ № $this->sale->id";      
		return view('admin.pages.order', ['page' => $page, 'order' => $sale]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
