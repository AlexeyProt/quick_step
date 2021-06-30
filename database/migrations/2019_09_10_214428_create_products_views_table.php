<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsViewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products_views', function (Blueprint $table) {
			$table->integer('category_id')->unsigned();
            $table->integer('page_id')->unsigned();
			$table->foreign('page_id')
				->references('id')->on('pages')->onDelete('cascade');	
			$table->foreign('category_id')
				->references('id')->on('categories')->onDelete('cascade');
			$table->primary(['category_id', 'page_id']);		
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products_views');
    }
}
