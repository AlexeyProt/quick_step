<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductViewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_views', function (Blueprint $table) {
            $table->integer('product_id')->unsigned();
			$table->integer('page_id')->unsigned();
			$table->foreign('product_id')
				->references('id')->on('products')->onDelete('cascade');
			$table->foreign('page_id')
				->references('id')->on('pages')->onDelete('cascade');	
			$table->primary(['product_id', 'page_id']);	
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_views');
    }
}
