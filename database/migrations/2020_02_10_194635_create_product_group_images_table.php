<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductGroupImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_group_images', function (Blueprint $table) {
			$table->string('name', 100);
            $table->integer('product_group_id')->unsigned();
			$table->primary(['name', 'product_group_id']);
			$table->foreign('product_group_id')
				->references('id')->on('product_groups')->onDelete('cascade');			
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
        Schema::dropIfExists('product_group_images');
    }
}
