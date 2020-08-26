<?php
require_once ('error_handler.php');
require_once ('grid.class.php');

$action = 'load';
if (isset($_GET['action'])){
    $action = $_GET['action'];
}

if ($action == 'load'){
    $page = $_POST['page'] ?? 1;
    $limit = $_POST['rows'] ?? 5;
    $sidx = $_POST['sidx'] ?? 'product_id';
    $sord = $_POST['sord'] ?? 'asc';

    $grid = new Grid($page, $limit, $sidx, $sord);
    if (!isset($response)){
        $response = new stdClass();
        $response->success = false;
    }
    $response->page = $page;
    $response->total = $grid->getTotalPages();
    $response->records = $grid->getTotalItemsCount();
    $currentPageItems = $grid->getCurrentPageItems();

    for ($i= 0; $i < count($currentPageItems); $i++){
        $response->rows[$i]['id'] = $currentPageItems[$i]['product_id'];
        $response->rows[$i]['cell'] = array(
            $currentPageItems[$i]['product_id'],
            $currentPageItems[$i]['name'],
            $currentPageItems[$i]['price'],
            $currentPageItems[$i]['on_promotion']
        );
    }

    echo json_encode($response);
} elseif ($action == 'save'){
    $product_id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $on_promotion = ($_POST['on_promotion'] == 'Yes') ? 1:0;

    $grid = new Grid();
    echo $grid->updateItem($product_id, $name, $price, $on_promotion);
}