<?php
// load configuration file
require_once('config.php');
// start session
session_start();

// includes functionality to manipulate the products list 
class Grid 
{      
  // grid pages count
  private $mTotalPages;
  // grid items count
  private $mTotalItemsCount;
  private $mItemsPerPage;
  private $mCurrentPage;
  
  private $mSortColumn;
  private $mSortDirection;
  // database handler
  private $conn;
    
  // class constructor  
  function __construct( $currentPage =1, $itemsPerPage=5, $sortColumn='product_id', $sortDirection='asc') 
  {   
    // create the MySQL connection
    $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS,
                                DB_NAME);
    $this->mCurrentPage = $currentPage;
	$this->mItemsPerPage = $itemsPerPage;
	$this->mSortColumn = $sortColumn;
	$this->mSortDirection = $sortDirection;
	// call countAllRecords to get the number of grid records
    $this->mTotalItemsCount = $this->countAllItems();
	if($this->mTotalItemsCount >0)	
		$this->mTotalPages = ceil($this->mTotalItemsCount/$this->mItemsPerPage);
	else
		$this->mTotalPages=0;	
	if($this->mCurrentPage > $this->mTotalPages)
		$this->mCurrentPage = $this->mTotalPages;
  }
  
  
  
  // read a page of products and save it to $this->grid
  public function getCurrentPageItems()
  {
    // create the SQL query that returns a page of products
    $queryString = 'SELECT * FROM product';	
	$queryString .= ' ORDER BY '.$this->conn->real_escape_string($this->mSortColumn).' '
				.$this->conn->real_escape_string($this->mSortDirection);
	$start = $this->mItemsPerPage * $this->mCurrentPage - $this->mItemsPerPage; // do not put $limit*($page - 1)
    if ($start < 0)
		$start = 0;
	$queryString .= ' LIMIT '.$start.','.$this->mItemsPerPage;
	
    // execute the query
    if ($result = $this->conn->query($queryString))
    {
	  for($i = 0; $items[$i] = $result->fetch_assoc(); $i++) ;   

	  // Delete last empty one
	  array_pop($items);
	  
      // close the results stream                     
      $result->close();
	  return $items;
    }       
  }
  
  public function getTotalPages()
  {
	return $this->mTotalPages;
  }
  
  
  // update a product
  public function updateItem($id, $name,$price,$on_promotion  )
  {
    // escape input data for safely using it in SQL statements
    $id = $this->conn->real_escape_string($id);
    $on_promotion = $this->conn->real_escape_string($on_promotion);
    $price = $this->conn->real_escape_string($price);
    $name = $this->conn->real_escape_string($name);
    // build the SQL query that updates a product record
    $queryString =  'UPDATE product SET name="' . $name . '", ' .
                    'price=' . $price . ',' .
                    'on_promotion=' . $on_promotion .
                    ' WHERE product_id=' . $id;

    // execute the SQL command
    $this->conn->query($queryString);
	return $this->conn->affected_rows;
  }

  

  // returns the total number of records for the grid
  private function countAllItems()
  {
      // the query that returns the record count
      $count_query = 'SELECT COUNT(*) FROM product';
      // execute the query and fetch the result 
      if ($result = $this->conn->query($count_query))
      {
        // retrieve the first returned row
        $row = $result->fetch_row(); 		
        // close the database handle
        $result->close();
		return $row[0];
      }    
	return 0;
  }         
  
  public function getTotalItemsCount()
  {
	return $this->mTotalItemsCount;
  }
    
// end class Grid
} 
?>
