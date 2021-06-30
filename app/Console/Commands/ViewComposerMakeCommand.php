<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class ViewComposerMakeCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'make:viewComposer';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new viewComposer class';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'ViewComposer';

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return base_path('stubs/viewComposer.stub');;
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Http\ViewComposers';
    }
}
