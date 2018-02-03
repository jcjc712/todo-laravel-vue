<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;
use Mockery\Exception;

/**
 * En esta clase deben implementar los metodos vacios de acuerdo a lo
 * previamente estudiado acerca de RESTFul. Recuerda que DEBEN validar los datos
 * de entrada y de regresar lo que les pide el método correctamente.
 *
 * Class TodoController
 * @package App\Http\Controllers
 */
class TodoController extends Controller
{
    public $todo;
    public function __construct(Todo $todo)
    {
        $this->todo = $todo;
    }

    /**
     * Este método del controlador regresa el listado del todos de la app
     * en un response del tipo json ordenados desde el más antiguo al más nuevo.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json([
            'rows' => $this->todo->elementsOrderByOlder(),
        ],200);
    }

    /**
     * Este método del controlador debe crear un nuevo registro todo
     * y al final regresa el registro creado en un response del tipo
     * json.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required',
            'done' => 'required|boolean',
        ]);
        $item = $this->todo->create($request->all());
        return response()->json([
            'row' => $item
        ], 200);
    }

    /**
     * Modifica el item todo con el $id correspondiente
     * y regresa el mismo item modificado.
     *
     * @param integer $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $request->validate([
            'text' => 'required',
            'done' => 'required|boolean',
        ]);
        $this->todo->find($id)->update($request->all());
        return response()->json([
            'row' => $this->todo->find($id)
        ], 200);
    }

    /**
     * Elimina el registro y devuelve un response 200 en caso de exito o un 400
     * en caso de fallo pero igual en tipo json.
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $item = $this->todo->find($id);
        if($item){
            $item->delete();
            return response()->json([
                'msg' => 'success'
            ], 200);
        }
        return response()->json([
            'msg' => 'this item not exist'
        ], 400);
    }
}
