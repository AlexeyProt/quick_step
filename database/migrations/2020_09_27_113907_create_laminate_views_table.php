<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLaminateViewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('laminate_views', function (Blueprint $table) {
			$table->integer('page_id')->unsigned();
			$table->integer('product_id')->unsigned();
			$table->integer('category_id')->unsigned();
			$table->primary(['page_id', 'product_id']);
			$table->foreign('page_id')
				->references('id')->on('pages')->onDelete('cascade');
			$table->foreign('product_id')
				->references('id')->on('products')->onDelete('cascade');
			$table->foreign('category_id')
				->references('id')->on('categories')->onDelete('cascade');				
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('laminate_views');
    }
}
