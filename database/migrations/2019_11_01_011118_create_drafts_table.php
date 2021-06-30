<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDraftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drafts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uri', 255)->unique()->nullable();
            $table->string('title', 300)->nullable();
			$table->string('description', 300)->nullable();
			$table->text('content')->nullable();
			$table->integer('page_id')->unsigned()->nullable();
			$table->foreign('page_id')->references('id')->on('pages')->onDelete('cascade');			
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('drafts');
    }
}
