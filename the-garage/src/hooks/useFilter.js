import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, getProductsFilter } from "../api/products";

export const useFilter = (initialFilter = [], data, searchValue) => {
  const [selectedFilters, setSelectedFilters] = useState(initialFilter);
  const [filtrosSeleccionadosAgrupados, setFiltrosSeleccionadosAgrupados] =
    useState({});
  const [checkFilter, setCheckFilter] = useState({});
  const [dataFiltered, setDataFiltered] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [dataSearch2, setDataSearch2] = useState([]);
  const [datosFiltradoApi, setDatosFiltradoApi] = useState([]); //datos filtrados de la api
  const navigate = useNavigate();
  //datasearch2=dataBase para la base de los filtros que no cambia.

  useEffect(() => {
    if (searchValue) {
      // const dataWithSearchValue = data.filter((element) =>
      //   element.title.toLowerCase().includes(searchValue.toLowerCase())
      // );

      setDataFiltered([...data]);
      setDataSearch([...data]);
      setDataSearch2([...data]);
    } else {
      setDataFiltered([...data]);
    }
  }, [searchValue, data]);

  const addFilter = (filter) => {
    setSelectedFilters((prevFilters) => [filter, ...prevFilters]);
  };

  const deleteFilter = (filter) => {
    const aux = [...selectedFilters];
    setSelectedFilters(aux.filter((element) => element != filter));
  };

  const clean = () => {
    setSelectedFilters([]);
    setCheckFilter({});
  };

  return {
    selectedFilters: selectedFilters,

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
  };
};
