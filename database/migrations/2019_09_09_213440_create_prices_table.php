<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prices', function (Blueprint $table) {			
            $table->integer('product_id')->unsigned();
			$table->primary('product_id')
				->references('id')->on('products')->onDelete('cascade');	
            $table->integer('price_history_id')->unsigned();
			$table->foreign('price_history_id')
				->references('id')->on('price_histories')->onDelete('cascade');					
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prices');
    }
}
