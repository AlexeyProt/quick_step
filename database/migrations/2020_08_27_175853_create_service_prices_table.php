<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicePricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_prices', function (Blueprint $table) {
            $table->integer('service_id')->unsigned();
			$table->primary('service_id')
				->references('id')->on('services')->onDelete('cascade');	
            $table->integer('service_price_history_id')->unsigned();
			$table->foreign('service_price_history_id')
				->references('id')->on('service_price_histories')->onDelete('cascade');	
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_prices');
    }
}
