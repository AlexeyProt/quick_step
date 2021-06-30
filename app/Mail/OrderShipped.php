<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Sale;
use App\Services\SaleService;

class OrderShipped extends Mailable
{
    use Queueable, SerializesModels;
	
    /**
     * The order instance.
     *
     * @var Sale
     */
    public $sale;	

    /**
     * Create a new message instance.
     *
     * @return void
     */
	public function __construct(Sale $sale) {
		$this->sale = $sale;
	}

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
		$saleService = app()->make(SaleService::class);
		$sale = $saleService->attributes($this->sale);
		$sale = $saleService->sortCategories($sale, ['Ламинат', 'Винил', 'Паркетная доска', 'Подложка', 'Герметик', 'Клей', 'Плинтус']);
		
        return $this->subject('Сделан заказ')
				->view('emails.orders.shipped', ['order' => $sale]);
    }
}
