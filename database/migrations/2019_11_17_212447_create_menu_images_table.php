<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenuImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_images', function (Blueprint $table) {
			$table->string('name', 100);
            $table->integer('menu_category_id')->unsigned();
			$table->primary(['name', 'menu_category_id']);
			$table->foreign('menu_category_id')
				->references('id')->on('menu_categories')->onDelete('cascade');	
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_images');
    }
}
