import ProcessBar from "components/process-bar";
import HeaderContainer from "containers/layout/header.container";
import { OnboardViewProps } from "interfaces/onboard.interface";
import { Fragment, ReactNode } from 'react';
import { Swipe, TextTitle, Title, TitleSpan, ViewBox } from "./onboard.style";

const OnboardView = ({
  bulletList,
  indexSwipe,
  setIndexSwipe,
  t,
  arraySteps,
  query,
  slides,
}: OnboardViewProps) => {
  return (
    <>
      <ViewBox>
        <HeaderContainer />
        {/* title */}
        <Title>
          {t("title")} <TitleSpan> {query?.first_name}!</TitleSpan>
        </Title>
        {indexSwipe === 0 && !slides.step5 && (
          <TextTitle dangerouslySetInnerHTML={{ __html: t("subTitle") }} />
        )}
        {/* end title */}
        {/* steps */}
        {!slides.step5 ? (
          <ProcessBar
            bulletList={bulletList}
            indexSwipe={indexSwipe}
            setIndexSwipe={setIndexSwipe}
          />
        ) : (
          <></>
        )}
        {/* end steps */}
      </ViewBox>
      {/* Swipe  */}
      <Swipe index={indexSwipe} onChangeIndex={setIndexSwipe} enableMouseEvents>
        {arraySteps().map((ele: ReactNode, index: number) =>(
            <Fragment key={index}>
              {ele}
            </Fragment>
          ))}
      </Swipe>
      {/* end Swipe */}
    </>
  );
};

export default OnboardView;
