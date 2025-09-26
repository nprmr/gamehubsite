"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import styled from "styled-components";

// Обёртка с адаптивными размерами
const RiveWrapper = styled.div`
  width: 440px;
  height: 440px;
  margin: 0 auto;

  @media (max-width: 1064px) {
    width: 256px;
    height: 256px;
  }
`;

export default function NeverEverRive() {
    const { rive, RiveComponent } = useRive({
        src: "/rive/never-ever.riv",
        stateMachines: "State Machine 1",
        autoplay: true,
    });

    const onClickInput = useStateMachineInput(
        rive,
        "State Machine 1",
        "Activation"
    );

    return (
        <RiveWrapper onClick={() => onClickInput && onClickInput.fire()}>
            <RiveComponent />
        </RiveWrapper>
    );
}
