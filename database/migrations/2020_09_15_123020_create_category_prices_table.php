<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryPricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_prices', function (Blueprint $table) {
            $table->integer('category_id')->unsigned();
			$table->primary('category_id')
				->references('id')->on('categories')->onDelete('cascade');	
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
        Schema::dropIfExists('category_prices');
    }
}
