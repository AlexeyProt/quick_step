<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiceMagazineSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_magazine_sales', function (Blueprint $table) {
			$table->integer('sale_id')->unsigned();
			$table->foreign('sale_id')->references('id')->on('sales')->onDelete('cascade');
			$table->integer('service_id')->unsigned();
			$table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
			$table->primary(['sale_id', 'service_id']);			
			$table->integer('service_price_history_id')->unsigned();
			$table->foreign('service_price_history_id')->references('id')->on('service_price_history_id')->onDelete('cascade');						
			$table->smallInteger('quantity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_magazine_sales');
    }
}
