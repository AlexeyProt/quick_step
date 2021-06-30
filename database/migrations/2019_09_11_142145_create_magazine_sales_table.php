<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMagazineSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('magazine_sales', function (Blueprint $table) {
			$table->integer('sale_id')->unsigned();
			$table->foreign('sale_id')->references('id')->on('sales')->onDelete('cascade');
			$table->integer('product_id')->unsigned();
			$table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
			$table->primary(['sale_id', 'product_id']);			
			$table->integer('price_history_id')->unsigned();
			$table->foreign('price_history_id')->references('id')->on('price_histories')->onDelete('cascade');						
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
        Schema::dropIfExists('magazine_sales');
    }
}
