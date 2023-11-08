import NormalButton from "components/button/submit";
import NormalCard from "components/card";
import Icon from "components/Icon";
import { FONT_FAMILY, GLOBAL_COLOR } from "constants/style";
import {
  ObjectUrlImageType,
  TypeImageCardId
} from "interfaces/onboard.interface";
import React from "react";
import {
  CardImageColumn,
  CardImageRow,
  ImageCardId,
  Text,
  TextWrapper
} from "./take-photo";

interface TakePhotoProps {
  onOpenCamera: (type: TypeImageCardId) => void;
  objectUrlImage: ObjectUrlImageType;
  isError: boolean;
}

const buttonStyle = {
  fontFamily: FONT_FAMILY.montserrat,
  paddingTop: 0,
};

const TakePhoto: React.FC<TakePhotoProps> = ({
  onOpenCamera,
  objectUrlImage,
  isError,
}) => {
  return (
    <NormalCard bgColor={GLOBAL_COLOR.cottageCoreSunset} isError={isError}>
      <TextWrapper>
        <Text>Take photos of both sides</Text>
        {isError && (
          <Icon
            name="error-icon"
            stylePicture={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
      </TextWrapper>
      <CardImageRow>
        <CardImageColumn>
          <div style={{
              marginTop: 8,
              width: '100%'
            }}>
          {objectUrlImage?.frontUrl ? (
            <ImageCardId
            src={objectUrlImage.frontUrl}
            alt="image front card id"
          />
          ) : (
            <Icon
              name="id-font-card"
              alt="id front card"
              style={{
                width: "100%",
              }}
            />
          )}
          </div>
          <NormalButton
            type="iconLeft"
            iconName="camera-icon"
            style={buttonStyle}
            onClick={() => onOpenCamera("frontUrl")}
          >
            Front
          </NormalButton>
        </CardImageColumn>
        <CardImageColumn>
          <div style={{
              marginTop: 8,
              width: '100%'
            }}>
            {objectUrlImage?.backUrl ? (
              <ImageCardId
                src={objectUrlImage.backUrl}
                alt="image back card id"
                style={{
                  
                }}
              />
            ) : (
              <Icon
                name="id-back-card"
                alt="id back card"
                style={{
                  width: "100%",
                }}
              />
            )}
          </div>
          <NormalButton
            type="iconLeft"
            style={buttonStyle}
            iconName="camera-icon"
            onClick={() => onOpenCamera("backUrl")}
          >
            Back
          </NormalButton>
        </CardImageColumn>
      </CardImageRow>
      <CardImageRow
        style={{
          marginTop: "9px",
        }}
      ></CardImageRow>
    </NormalCard>
  );
};

export default TakePhoto;
