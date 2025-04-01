import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import "./dashboard.scss";
import axios from "axios";
import _ from "lodash";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Pokedex } from "./pokedex/pokedex";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../utils/axiosConfig";

const checkColor = {
  Normal: "#929da3",
  Fighting: "#ce416b",
  Flying: "#8fa9de",
  Poison: "#aa6bc8",
  Ground: "#d97845",
  Rock: "#c5b78c",
  Bug: "#91c12f",
  Ghost: "#5269ad",
  Steel: "#5a8ea2",
  Fire: "#ff9d55",
  Water: "#5090d6",
  Grass: "#63bc5a",
  Electric: "#f4d23c",
  Psychic: "#fa7179",
  Ice: "#73cec0",
  Dragon: "#0b6dc3",
  Dark: "#5a5465",
  Fairy: "#ec8fe6",
  Physical: "#ea551e",
  Special: "#1c4684",
  Status: "#999999",
};

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, SetSearch] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [perPage, setPerPage] = useState(8);

  const fetchApi = (value = "", page = 1) => {
    setLoading(true);

    axiosInstance
      .get(`pokemon?per_page=${8}&q=${value}&page=${page}`)
      .then((resp) => {
        setData(resp.data.data);
      })
      .catch((err) => {
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const assignColor = (value) => {
    const isAssing =
      Array.isArray(value) &&
      value.length > 0 &&
      value.map((item) => checkColor[item]);

    return isAssing;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFunc = useCallback(_.debounce(fetchApi, 500), []);

  const handleSearch = (e) => {
    setLoading(true);
    const value = e.target.value;
    SetSearch(value);
    debounceFunc(value);
  };

  const handleLoadMore = useCallback(() => {
    setLoadMore(true);
    axiosInstance
      .get(`pokemon?per_page=${perPage + 8}&q=${""}&page=${1}`)
      .then((resp) => {
        setData(resp.data.data);

        setLoadMore(false);
        setPerPage((prev) => prev + 8);
      })
      .catch(() => {
        setData([]);
        setLoadMore(false);
      });
  }, [perPage]);

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="title">Pokedex</div>
        <div className="profile">
          <IconButton>
            <Avatar alt="User" />
          </IconButton>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="search-box">
          <TextField
            className="search-field"
            placeholder="Search by name"
            autoComplete="off"
            value={search}
            onChange={handleSearch}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        <div className="cards">
          {loading ? (
            <div className="loader">
              <CircularProgress size={30} />
            </div>
          ) : (
            <>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <Pokedex
                    key={item.id}
                    count={item.id}
                    img={item.image.hires}
                    name={item?.name?.english}
                    type={item.type}
                    typeColor={assignColor(item.type)}
                  />
                ))
              ) : (
                <div>No Data Available</div>
              )}
            </>
          )}
        </div>
        {Array.isArray(data) && data.length > 0 && (
          <Button
            className="loader-button"
            loading={loadMore}
            variant="contained"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};
