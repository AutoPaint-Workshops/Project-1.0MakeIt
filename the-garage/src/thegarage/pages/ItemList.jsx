import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";

import {
  Item,
  Controls,
  Filter,
  Paginator,
  RowItemStyled,
  ContainerNumberItemsStyled,
  ContainerVisualizationStyled,
} from "../components";
import { mockDataTest } from "../dataTest/dataMock";
import { useFilter } from "../../hooks/useFilter";
import { usePaginator } from "../../hooks/usePaginator";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../api/products";
import { useEffect } from "react";

export function ItemList() {
  const { searchValue } = useParams();
  const [data, setData] = useState(mockDataTest);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await getProducts();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(()=>{
  //   loadProducts();
  // },[]);
  //Tener en cuenta el searchValue para hacer la busqueda como paramaetro de useEffect

  const {
    selectedFilters,
    addFilter,
    deleteFilter,
    clean,
    checkFilter,
    setCheckFilter,
    dataFiltered,
    dataSearch,
    dataSearch2,
  } = useFilter([], data, searchValue);

  const ITEM_PER_PAGE = 5;

  const {
    totalPages,
    nextHandler,
    specificHandler,
    prevHandler,
    items,
    currentPage,
    setCurrentPage,
  } = usePaginator(searchValue ? dataSearch : dataFiltered, ITEM_PER_PAGE, 0);

  return (
    <Container className="">
      <Row>
        <Controls
          filters={selectedFilters}
          clean={clean}
          setCurrentPage={setCurrentPage}
        />
      </Row>

      <RowItemStyled className="">
        <Col md={3}>
          <Filter
            data={searchValue ? dataSearch2 : data}
            addFilter={addFilter}
            deleteFilter={deleteFilter}
            setCheckFilter={setCheckFilter}
            checkFilter={checkFilter}
          />
        </Col>
        <Col md={9}>
          <ContainerNumberItemsStyled>
            <strong>
              <span>
                {" "}
                {searchValue ? dataSearch.length : dataFiltered.length}{" "}
                Productos Encontrados
              </span>
            </strong>
            <div>
              <span>Visualizacion: </span>
              <i className="bi bi-grid-3x3-gap-fill"></i>
              <i className="bi bi-distribute-vertical"></i>
            </div>
          </ContainerNumberItemsStyled>
          <ContainerVisualizationStyled>
            {loading && <Spinner animation="border" variant="primary" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {searchValue
              ? dataSearch.map((element) => (
                  <Item key={element.id} item={element} />
                ))
              : items.map((element) => (
                  <Item key={element.id} item={element} />
                ))}
          </ContainerVisualizationStyled>
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            nextHandler={nextHandler}
            prevHandler={prevHandler}
            specificHandler={specificHandler}
          />
        </Col>
      </RowItemStyled>
    </Container>
  );
}
