import styled from "@emotion/styled";
import React, { useState } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import airplaneImg from "../../src/image/airplane.jpg";
import oceanImg from "../../src/image/ocean.jpg";
import plumBlossomImg from "../../src/image/plum-blossoms.jpg";
import roadImg from "../../src/image/road.jpg";
import shoppingMallImg from "../../src/image/shopping-mall.jpg";

const IMAGE_WIDTH = 640;

const imageList = [
  {
    id: 1,
    name: "airplane",
    src: airplaneImg,
  },
  {
    id: 2,
    name: "ocean",
    src: oceanImg,
  },
  {
    id: 3,
    name: "plumBlossom",
    src: plumBlossomImg,
  },
  {
    id: 4,
    name: "road",
    src: roadImg,
  },
  {
    id: 5,
    name: "shoppingMall",
    src: shoppingMallImg,
  },
];
const Container = styled.div`
  height: 550px;
  width: 640px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const ImageBox = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  transition: 1s;
`;

const AllowBtn = styled.div`
  position: absolute;
  font-size: 60px;
  top: 40%;
  line-height: 60px;
  cursor: pointer;
  background-color: gray;
  opacity: 0.3;
  z-index: 100;
  transition: 0.2s;
`;

const Indicator = styled.ul`
  list-style: none;
  display: flex;
  width: 640px;
  align-items: center;
  gap: 16px;
  justify-content: center;
`;

const IndicatorItem = styled.li<{
  page: boolean;
}>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: black;
  opacity: ${(props) => (props.page ? 0.6 : 0.3)};
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

function ImageSlider() {
  const [showAllow, setShowAllow] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const onClickLeftAllow = () => {
    if (page === 0) setPage(imageList.length - 1);
    else setPage((prev) => prev - 1);
  };

  const onClickRightAllow = () => {
    if (page === imageList.length - 1) setPage(0);
    else setPage((prev) => prev + 1);
  };
  return (
    <Container>
      <AllowBtn
        style={{ left: showAllow ? "0" : "-60px" }}
        onMouseEnter={() => setShowAllow(true)}
        onClick={onClickLeftAllow}
      >
        <VscChevronLeft />
      </AllowBtn>
      <AllowBtn
        style={{ right: showAllow ? "0" : "-60px" }}
        onMouseEnter={() => setShowAllow(true)}
        onClick={onClickRightAllow}
      >
        <VscChevronRight />
      </AllowBtn>
      <ImageBox
        style={{ left: `-${page * IMAGE_WIDTH}px` }}
        onMouseOver={() => setShowAllow(true)}
        onMouseOut={() => setShowAllow(false)}
      >
        {imageList.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.name}
            width={IMAGE_WIDTH}
            height={500}
          />
        ))}
      </ImageBox>
      <Indicator>
        {imageList.map((_, idx) => (
          <IndicatorItem page={idx === page} onClick={() => setPage(idx)} />
        ))}
      </Indicator>
    </Container>
  );
}

export default ImageSlider;
