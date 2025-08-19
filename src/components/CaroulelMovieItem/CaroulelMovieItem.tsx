import { RefObject } from "react";
import { Typography } from "@mui/material";
import { MovieShortData } from "../../types/types";
import { Link } from "react-router";
import styles from "./CaroulelMovieItem.module.css";

interface CaroulelMovieItemProps extends MovieShortData {
  ref: RefObject<HTMLLIElement>;
}

export default function CaroulelMovieItem({
  kinopoiskId,
  nameRu,
  posterUrl,
  ref,
}: CaroulelMovieItemProps) {
  return (
    <li className={styles.movie} ref={ref}>
      <Link to={"/movies/" + kinopoiskId}>
        <div className={styles.poster}>
          <img className={styles.image} src={posterUrl} alt="poster" />
        </div>
        <Typography
          variant="h5"
          component="h5"
          align="center"
          sx={{ fontWeight: 500, fontSize: 16, pt: 0.5 }}
        >
          {nameRu}
        </Typography>
      </Link>
    </li>
  );
}
