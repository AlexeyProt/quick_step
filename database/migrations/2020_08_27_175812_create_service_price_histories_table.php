<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicePriceHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_price_histories', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('service_id')->unsigned();
			$table->foreign('service_id')
				->references('id')->on('services')->onDelete('cascade');			
			$table->integer('price');
            $table->timestamp('actual_on');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_price_histories');
    }
}
