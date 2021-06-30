<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductCharacteristicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_characteristics', function (Blueprint $table) {
			$table->integer('product_id')->unsigned();
			$table->integer('characteristic_id')->unsigned();
			$table->primary(['product_id', 'characteristic_id']);
			$table->foreign('product_id')
				->references('id')->on('products')->onDelete('cascade');
			$table->foreign('characteristic_id')
				->references('id')->on('characteristics')->onDelete('cascade');
			$table->string('value', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_characteristics');
    }
}
