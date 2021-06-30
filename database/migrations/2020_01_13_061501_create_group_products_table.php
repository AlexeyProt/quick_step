<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_products', function (Blueprint $table) {
			$table->integer('product_group_id')->unsigned();
			$table->integer('product_id')->unsigned();
			$table->foreign('product_group_id')
				->references('id')->on('product_groups')->onDelete('cascade');
			$table->foreign('product_id')
				->references('id')->on('products')->onDelete('cascade');
			$table->primary(['product_group_id', 'product_id']);	
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_products');
    }
}
