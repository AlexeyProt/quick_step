<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryCharacteristicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_characteristics', function (Blueprint $table) {
			$table->integer('category_id')->unsigned();
			$table->integer('characteristic_id')->unsigned();
			$table->primary(['category_id', 'characteristic_id']);
			$table->foreign('category_id')
				->references('id')->on('categories')->onDelete('cascade');
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
        Schema::dropIfExists('category_characteristics');
    }
}
