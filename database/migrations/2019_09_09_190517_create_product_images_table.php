<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_images', function (Blueprint $table) {
			$table->string('name', 100);
            $table->integer('product_id')->unsigned();
			$table->primary(['name', 'product_id']);
			$table->foreign('product_id')
				->references('id')->on('products')->onDelete('cascade');			
			$table->tinyInteger('level');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_images');
    }
}
