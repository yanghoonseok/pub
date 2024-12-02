<template>
  <!-- 
    수준별로 색상이 다르게 표현됨
    수준1: .theme-1
    수준2: .theme-2
    수준3: .theme-3
  -->
  <ProgressHeader :currentNum="20" :totalNum="80" class="theme-1" />

  <!-- 수준별로 색상이 다르게 표현됨 -->
  <div class="contents-body theme-1">
    <div class="practice-top">
      <button type="button" class="btn-sound">
        <IconSound :isSoundPlay="isSoundPlay" />
        <span class="blind">음성듣기</span>
      </button>
      <div class="practice-text">
        오늘 점심에 냉면을 먹은 후 속이 좀 불편했습니다. 약국에서 소화제를 사서
        먹었지만 (㉠) 그래서 병원에 가서 진료를 받았습니다. 배탈이었습니다. 저는
        처방전을 받고 약국에 가서 약을 샀습니다. 그리고 집에 와서 쉬었습니다.
        저녁을 먹은 후 약을 먹고 잤습니다.
      </div>
    </div>

    <div class="practice-body">
      <!-- 삼지선다형 -->
      <div class="practice-wrap">
        <div class="practice-question">
          <span class="num">1.</span>
          <span class="txt">㉠에 알맞은 것은 무엇입니까?</span>
        </div>

        <div class="practice-answer">
          <!-- 정답 -->
          <button
            type="button"
            class="btn-answer"
            data-answer="true"
            @click.once="selectAnswer"
          >
            금방 나았습니다.
          </button>
          <button
            type="button"
            class="btn-answer"
            data-answer="false"
            @click.once="selectAnswer"
          >
            좋아지지 않았습니다.
          </button>
          <button
            type="button"
            class="btn-answer"
            data-answer="false"
            @click.once="selectAnswer"
          >
            집에 약이 없습니다.
          </button>
        </div>
      </div>

      <!-- 선택형 -->
      <div class="practice-wrap">
        <div class="practice-question">
          <span class="num">2.</span>
          <span class="txt">
            이 사람은 <span class="blank"></span>를 타고 집에 왔습니다.
          </span>
        </div>

        <div class="practice-answer">
          <!-- 정답 -->
          <button
            type="button"
            class="btn-answer"
            data-answer="true"
            @click.once="selectAnswer"
          >
            버스
          </button>
          <button
            type="button"
            class="btn-answer"
            data-answer="false"
            @click.once="selectAnswer"
          >
            자전거
          </button>
        </div>
      </div>

      <!-- OX형 -->
      <div class="practice-wrap">
        <div class="practice-question">
          <span class="num">3.</span>
          <span class="txt">맞으면 O, 틀리면 X를 누르세요.</span>
        </div>

        <div class="practice-sub-question">
          <span class="txt">소화제를 먹지 않고 병원에 갔다.</span>
        </div>

        <div class="practice-answer answer-center">
          <button
            type="button"
            class="btn-ox"
            data-answer="false"
            @click.once="selectAnswer"
          >
            <img src="~images/icon_o.svg" class="img-ox" alt="O" />
          </button>
          <button
            type="button"
            class="btn-ox"
            data-answer="true"
            @click.once="selectAnswer"
          >
            <img src="~images/icon_x.svg" class="img-ox" alt="X" />
          </button>
        </div>
      </div>

      <div class="practice-wrap">
        <div class="practice-question">
          <span class="num">4.</span>
          <span class="txt">맞으면 O, 틀리면 X를 누르세요.</span>
        </div>

        <div class="practice-sub-question">
          <span class="num">1)</span>
          <span class="txt">저녁을 먹은 후 약을 먹고 잤다</span>
        </div>

        <div class="practice-answer answer-center">
          <button
            type="button"
            class="btn-ox"
            data-answer="true"
            @click.once="selectAnswer"
          >
            <img src="~images/icon_o.svg" class="img-ox" alt="O" />
          </button>
          <button
            type="button"
            class="btn-ox"
            data-answer="false"
            @click.once="selectAnswer"
          >
            <img src="~images/icon_x.svg" class="img-ox" alt="X" />
          </button>
        </div>

        <div class="practice-sub-question">
          <span class="num">2)</span>
          <span class="txt">저녁을 먹은 후 약을 먹고 잤다</span>
        </div>

        <div class="practice-answer answer-center">
          <button
            type="button"
            class="btn-ox"
            data-answer="false"
            @click.once="selectAnswer"
          >
            <img src="~images/icon_o.svg" class="img-ox" alt="O" />
          </button>
          <button
            type="button"
            class="btn-ox"
            data-answer="true"
            @click.once="selectAnswer"
          >
            <img src="~images/icon_x.svg" class="img-ox" alt="X" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import { sleep } from "@/common/utils/util";
import { useSound } from "@vueuse/sound";
import { VueImageZoomer } from "vue-image-zoomer";
import "vue-image-zoomer/dist/style.css";
import ProgressHeader from "../components/layout/ProgressHeader.vue";
import IconSound from "../components/icon/IconSound.vue";
import correctSound from "#/assets/sounds/correct.wav";
import wrongSound from "#/assets/sounds/wrong.wav";

export default {
  components: { ProgressHeader, IconSound, VueImageZoomer },
  setup() {
    const { proxy: vm } = getCurrentInstance();

    const isSoundPlay = ref(false);
    const solveCount = ref(0);

    const ANSWER_LENGTH = 4;

    const { play: playCorrectSound } = useSound(correctSound);
    const { play: playWrongSound } = useSound(wrongSound);

    // 삼지선다, 선택형, OX형
    const selectAnswer = async (event) => {
      const target = event.currentTarget;
      const isAnswer = target.dataset.answer;

      target.parentElement.classList.add("lock");
      target.classList.add("is-play");

      if (isAnswer === "true") {
        // 정답
        playCorrectSound();
      } else {
        // 오답
        playWrongSound();

        await sleep(600);

        // 정답 표시
        target.parentElement
          .querySelector("[data-answer='true']")
          .classList.add("is-correct", "is-blink");
      }

      checkSolveCount();
    };

    const checkSolveCount = async () => {
      solveCount.value++;

      // 문제를 다 풀었을 경우
      if (solveCount.value >= ANSWER_LENGTH) {
        /* await sleep(1000);

        vm.$appRouter.push({ name: "Practice2" }); */
      }
    };

    return {
      isSoundPlay,
      selectAnswer,
    };
  },
};
</script>
