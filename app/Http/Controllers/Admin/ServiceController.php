<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Page;
use App\Service;
use App\Services\PaginationService;

class ServiceController extends Controller
{
	public $service;
	
	public $paginationService;
	
	public function __construct(Service $service, PaginationService $paginationService) {
		$this->service = $service;
		$this->paginationService = $paginationService;
	}	
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		$page = new Page();
		$page->title = 'Услуги';
		$page->description = $page->title;		
		
		$services = $this->service->with(['service_price.service_price_history']);
		
		$this->paginationService->addBuilder($services);
		$services = $this->paginationService->paginate(15);
	
		return view('admin.pages.services', ['page' => $page, 'services' => $services]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
		$page = new Page();
		$page->title = 'Редактирование услуги';
		$page->description = $page->title;			
		
		return view('admin.pages.editService', [
			'page' => $page
		]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->service = $this->service->create($request->input('service'));
		$service_price_history = new \App\Service_price_history($request->input('service_price_history'));
		$service_price = new \App\Service_price;
		
		$service_price_history->service_id = $this->service->id;
		$service_price_history->save();
		$service_price->service_price_history_id = $service_price_history->id;
		$this->service->service_price()->save($service_price);		
		
		return $this->service->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
		$page = new Page();
		$page->title = 'Редактирование услуги';
		$page->description = $page->title;			
        $service = $this->service->findOrFail($id);
		
		return view('admin.pages.editService', [
			'page' => $page, 'service' => $service
		]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
		$this->service = $this->service->findOrFail($request->input('service.id'));	
		$this->service->update( $request->input('service') );
		$service_price_history = new \App\Service_price_history($request->input('service_price_history'));
		// Если цена была изменена
		if ($this->service->service_price->service_price_history->price != $service_price_history->price) {
			$this->service->service_price_history()->save($service_price_history);
			$this->service->service_price->service_price_history()->associate($service_price_history);
			$this->service->service_price->save();
		}
		
		return $this->service->toJson();
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
