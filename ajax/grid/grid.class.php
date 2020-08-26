<?php
require_once ('config.php');
session_start();

class Grid{
    private $conn;
    private $mTotalPages;
    private $mItemsPerPage;
    private $mCurrentPage;
    private $mTotalItemsCount;
    private $mSortColumn;
    private $mSortDirection;

    public  function __construct($currentPage = 1, $itemsPerPage = 5, $sortColumn='product_id',$sortDirection='asc')
    {
        $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        $this->mCurrentPage = $currentPage;
        $this->mItemsPerPage = $itemsPerPage;
        $this->mSortColumn = $sortColumn;
        $this->mSortDirection = $sortDirection;

        $this->mTotalItemsCount = $this->countAllItems();

        if ($this->mTotalItemsCount > 0){
            $this->mTotalPages = ceil($this->mTotalItemsCount / $this->mItemsPerPage);
        } else {
            $this->mTotalPages = 0;
            if ($this->mCurrentPage  > $this->mTotalPages){
                $this->mCurrentPage = $this->mTotalPages;
            }
        }
    }


    public function getCurrentPageItems(){
        $queryString = 'SELECT * FROM product ';
        $queryString .= ' ORDER BY '.
                    $this->conn->real_escape_string($this->mSortColumn). ' '.
                    $this->conn->real_escape_string($this->mSortDirection);

        $start = $this->mItemsPerPage * $this->mCurrentPage- $this->mItemsPerPage;

        if ($start < 0){
            $start = 0;
        }
        $queryString .= ' LIMIT '.$start .','.$this->mItemsPerPage;

        if ($result = $this->conn->query($queryString)){
            for($i=0; $items[$i] = $result->fetch_assoc(); $i++);
            array_pop($items);

            $result->close();

            return $items;
        }
    }
    public function getTotalPages(){
        return $this->mTotalPages;
    }
    public function updateItem($id, $name, $price, $on_promotion){
        $id = $this->conn->real_escape_string($id);
        $name = $this->conn->real_escape_string($name);
        $price = $this->conn->real_escape_string($price);
        $on_promotion = $this->conn->real_escape_string($on_promotion);

        $queryString = 'UPDATE product SET name="' .$name. '", '.
                        'price=' . $price.','
                        . 'on_promotion='. $on_promotion
                        . ' WHERE product_id='.$id;
         $this->conn->query($queryString);
        return $this->conn->affected_rows;
    }
    public function countAllItems(){
        $countQuery = 'SELECT COUNT(*) FROM `product`';
        if ($result=$this->conn->query($countQuery)){
            $row = $result->fetch_row();
            $result->close();
            return $row[0];
        }
        return 0;
    }
    public function getTotalItemsCount(){
        return $this->mTotalItemsCount;
    }

}