import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

const PlusBox = styled.div`
  min-width: 80px;
  min-height: 80px;
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
const ImageBox = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 4px;
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;
  width: 80vw;
  overflow-x: scroll;
`;
function ImageGallery() {
  const [imageList, setImageList] = useState<string[]>([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (event) => {
        setImageList((prev) => [...prev, event.target?.result as string]);
      };
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Container>
      {imageList.length === 0 && (
        <span style={{ display: "flex", textAlign: "center" }}>
          이미지가 없습니다 <br />
          이미지를 추가해주세요.
        </span>
      )}
      <ImageContainer>
        {imageList.map((image, idx) => (
          <ImageBox src={image} key={image + idx} />
        ))}
        <PlusBox {...getRootProps()}>
          <input type="file" hidden {...getInputProps()} />+
        </PlusBox>
      </ImageContainer>
    </Container>
  );
}

export default ImageGallery;
