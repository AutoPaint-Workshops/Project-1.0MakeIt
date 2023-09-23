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
import { useFilter } from "../../hooks/useFilter";
import { usePaginator } from "../../hooks/usePaginator";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getProducts,
  getProductsFilter,
  getProductsSearch,
} from "../../api/products";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function ItemList() {
  const { searchValue } = useParams();
  const [dataApi, setDataApi] = useState([]);
  const [dataMeta, setDataMeta] = useState({});
  const [filtroInicial, setFiltroInicial] = useState([]);
  const [filtrosecundario, setFiltrosecundario] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("offset") || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function cambiarPagina(newPage) {
    setPage(newPage);
  }

  async function loadProducts2() {
    setLoading(true);
    setError("");
    setDataApi([]);

    try {
      // Verificar si la URL contiene parámetros de consulta
      const queryParams = new URLSearchParams(window.location.search);
      const hasQueryParams = queryParams.has("filterCategorias"); // Cambia esto al nombre del parámetro que deseas verificar

      if (hasQueryParams && selectedFilters.length === 0) {
        // Redirigir a la parte de cargar productos filtrados
        console.log(queryParams.toString());

        navigate(`/productos?${queryParams.toString()}`);
        const response = await getProductsFilter(queryParams, 10, page);
        const responseFiltos = await getProductsFilter(queryParams, 100, 0);
        const responseFiltos3 = await getProducts(100, 0);
        setDataApi(response.data);
        setDataMeta(response.meta);
        setFiltroInicial(responseFiltos.data);
        setFiltrosecundario(responseFiltos3.data);
        return;

        // hasta aqui lo puedo omitir, no funciona del todo.
      }
      if (selectedFilters.length > 0) {
        cargarProductosFiltrados(page);
        return;
      }
      if (searchValue) {
        console.log("por aqui ando");
        const response = await getProductsSearch(10, page, searchValue);
        const responseFiltos = await getProductsSearch(100, 0, searchValue);

        setDataApi(response.data);
        setDataMeta(response.meta);
        setFiltroInicial(responseFiltos.data);
      } else {
        const response = await getProducts(10, page);
        const responseFiltos = await getProducts(100, 0);

        setDataApi(response.data);
        setDataMeta(response.meta);
        setFiltroInicial(responseFiltos.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  //el use effect estaba aqui

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
    filtrosSeleccionadosAgrupados,
    setFiltrosSeleccionadosAgrupados,
  } = useFilter([], dataApi, searchValue);

  const ITEM_PER_PAGE = 10;

  const {
    totalPages,
    nextHandler,
    specificHandler,
    prevHandler,
    items,
    currentPage,
    setCurrentPage,
  } = usePaginator(
    // searchValue ? dataSearch : filtroInicial,
    selectedFilters > 0 ? filtroInicial : filtroInicial,
    ITEM_PER_PAGE,
    page / 10,
    page
  );
  useEffect(() => {
    loadProducts2();
  }, [page, selectedFilters]);

  const armarFiltroQuerystring = () => {
    let querystring = "";
    if (selectedFilters.length > 0) {
      let categorias = filtrosSeleccionadosAgrupados.category;
      let precios = filtrosSeleccionadosAgrupados.price;
      let marcas = filtrosSeleccionadosAgrupados.brand;
      let valoraciones = filtrosSeleccionadosAgrupados.rating;
      let tiendas = filtrosSeleccionadosAgrupados.store;

      const reemplazarEspacios = (texto) => {
        return texto.replace(/ /g, "%20");
      };

      // Agregar categorías a la cadena de consulta si no es undefined
      if (categorias !== undefined) {
        categorias = reemplazarEspacios(categorias);
        querystring += `filterCategorias=${categorias}&`;
      }

      // Agregar precios a la cadena de consulta si no es undefined
      if (precios !== undefined) {
        querystring += `filterMarcas=${precios}&`;
      }

      // Agregar marcas a la cadena de consulta si no es undefined
      if (marcas !== undefined) {
        marcas = reemplazarEspacios(marcas);
        querystring += `filterMarcas=${marcas}&`;
      }

      // Agregar valoraciones a la cadena de consulta si no es undefined
      if (valoraciones !== undefined) {
        querystring += `filterCalificacion=${valoraciones}&`;
      }

      // Eliminar el último "&" si está presente en la cadena de consulta
      if (querystring.endsWith("&")) {
        querystring = querystring.slice(0, -1);
      }
    }
    return querystring;
  };

  const cargarProductosFiltrados = async (page) => {
    if (selectedFilters.length === 0) {
      loadProducts2();
      return;
    }
    setLoading(true);
    setError("");
    setDataApi([]);

    const querystring = armarFiltroQuerystring();
    console.log("querystring", querystring);

    navigate(`/productos?${querystring}`);
    const response = await getProductsFilter(querystring, 10, page);
    const responseFiltos = await getProductsFilter(querystring, 100, 0);
    const responseFiltos3 = await getProducts(100, 0);

    setDataApi(response.data);
    setDataMeta(response.meta);
    setFiltroInicial(responseFiltos.data);
    setFiltrosecundario(responseFiltos3.data);
    setLoading(false);
  };

  // useEffect(() => {
  //   if (selectedFilters.length > 0) {
  //     cargarProductosFiltrados();
  //   }
  // }, [selectedFilters]);

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
          <p>{selectedFilters}</p>
          <p>{filtrosecundario.length}</p>
          <p>{filtrosSeleccionadosAgrupados.category}</p>
          <p>{selectedFilters > 0 ? "hello" : "bad"}</p>
          <Filter
            data={selectedFilters.length > 0 ? filtrosecundario : filtroInicial}
            addFilter={addFilter}
            deleteFilter={deleteFilter}
            setCheckFilter={setCheckFilter}
            checkFilter={checkFilter}
            filtrosSeleccionadosAgrupados={filtrosSeleccionadosAgrupados}
            setFiltrosSeleccionadosAgrupados={setFiltrosSeleccionadosAgrupados}
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
              : dataFiltered.map((element) => (
                  <Item key={element.id} item={element} />
                ))}
          </ContainerVisualizationStyled>
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            nextHandler={nextHandler}
            prevHandler={prevHandler}
            specificHandler={specificHandler}
            cambiarPagina={cambiarPagina}
          />
        </Col>
      </RowItemStyled>
    </Container>
  );
}
