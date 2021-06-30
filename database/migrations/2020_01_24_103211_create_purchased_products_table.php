<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePurchasedProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchased_products', function (Blueprint $table) {
			$table->integer('purchased_bundle_id')->unsigned();
			$table->integer('product_id')->unsigned();
			$table->foreign('purchased_bundle_id')
				->references('id')->on('purchased_bundles')->onDelete('cascade');
			$table->foreign('product_id')
				->references('id')->on('products')->onDelete('cascade');
			$table->primary(['purchased_bundle_id', 'product_id']);	
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchased_products');
    }
}
