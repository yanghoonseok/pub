<template>
  <!-- 
    수준별로 색상이 다르게 표현됨
    수준1: .theme-1
    수준2: .theme-2
    수준3: .theme-3
  -->
  <ProgressHeader :currentNum="30" :totalNum="80" class="theme-1" />

  <!-- 수준별로 색상이 다르게 표현됨 -->
  <div class="contents-body theme-1">
    <div class="practice-top">
      <button type="button" class="btn-sound">
        <IconSound :isSoundPlay="isSoundPlay" />
        <span class="blind">음성듣기</span>
      </button>
      <div class="practice-text">
        2023년 여행 경험을 조사한 결과입니다. 그래프를 보고 문제의 답을
        선택하세요.

        <vue-image-zoomer
          regular="./images/sample/img_ox2.png"
          zoom="./images/sample/img_ox2.png"
          close-pos="bottom-right"
          :zoom-amount="1.5"
        />
      </div>
    </div>

    <div class="practice-body">
      <div v-for="(item, index) in sampleData" class="practice-wrap">
        <div class="practice-question">
          <span class="num">{{ index + 1 }}.</span>
          <span class="txt">{{ item.question }}</span>
        </div>

        <!-- 지시문 -->
        <div v-if="item.direction" class="practice-sub-question">
          <span
            class="txt"
            v-html="
              item.direction.replace(
                '\'빈칸\'',
                '<span class=\'blank\'></span>'
              )
            "
          ></span>
        </div>

        <div class="practice-answer">
          <!-- 주관식 -->
          <template v-if="item.type === 'shortAnswer'">
            <div class="short-answer">
              <div class="input-wrap">
                <input
                  type="text"
                  placeholder="정답 입력"
                  v-model="item.model"
                />
              </div>
              <button type="button" @click="enterAnswer($event, index)">
                확인
              </button>
            </div>
          </template>

          <!-- 매칭형 -->
          <template v-if="item.type === 'matching'">
            <div v-for="viewItem in item.view" class="answer-wrap">
              <button
                type="button"
                class="btn-answer"
                :class="{ 'answer-img': viewItem.left.image }"
                :data-answer-index="viewItem.left.index"
                @click="matchAnswer($event, index, 'left')"
              >
                <img
                  v-if="viewItem.left.image"
                  :src="viewItem.left.image"
                  alt=""
                />
                <span v-else>{{ viewItem.left.text }}</span>
              </button>

              <button
                type="button"
                class="btn-answer"
                :class="{ 'answer-img': viewItem.right.image }"
                :data-answer-index="viewItem.right.index"
                @click="matchAnswer($event, index, 'right')"
              >
                <img
                  v-if="viewItem.right.image"
                  :src="viewItem.right.image"
                  alt=""
                />
                <span v-else>{{ viewItem.right.text }}</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from "vue";
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
    const sampleData = reactive([
      {
        type: "shortAnswer",
        question: "2023년 국내 여행 경험이 가장 많은 세대는?",
        answer: "40대",
        model: null,
      },
      {
        type: "shortAnswer",
        question: "김민수씨는 몇 살입니까?",
        direction: "김민수씨는 '빈칸'살입니다.",
        answer: "20",
        model: null,
      },
      {
        type: "matching",
        question: "‘나’는 어떤 점이 누구와 닮았습니까?",
        view: [
          {
            left: { index: 1, text: "외모" },
            right: { index: 1, text: "형과 닮았다" },
          },
          {
            left: { index: 2, text: "성격" },
            right: { index: 3, text: "누나와 닮았다" },
          },
          {
            left: { index: 3, text: "취미" },
            right: { index: 2, text: "닮지 않았다" },
          },
        ],
        firstSelect: null,
        firstPosition: null,
        matchCount: 0,
      },
      {
        type: "matching",
        question: "그림과 맞는 문장을 선택하세요",
        view: [
          {
            left: { index: 1, image: "./images/sample/sample_answer.jpg" },
            right: { index: 2, text: "싱싱한 오징어네요" },
          },
          {
            left: { index: 2, image: "./images/sample/sample_answer2.jpg" },
            right: { index: 3, text: "맛있는 계란 후라이가 있습니다" },
          },
          {
            left: { index: 3, image: "./images/sample/sample_answer3.jpg" },
            right: { index: 1, text: "식빵에 바른 딸기쨈" },
          },
        ],
        firstSelect: null,
        firstPosition: null,
        matchCount: 0,
      },
    ]);

    const isSoundPlay = ref(false);
    const solveCount = ref(0);

    const { proxy: vm } = getCurrentInstance();

    const { play: playCorrectSound } = useSound(correctSound);
    const { play: playWrongSound } = useSound(wrongSound);

    // 주관식
    const enterAnswer = async (event, index) => {
      const data = sampleData[index];

      if (!data.model) {
        vm.$customAlert.open({
          message: "정답을 입력해주세요.",
        });

        return;
      }

      const target = event.target;
      const $answerContainer = target.parentElement;

      $answerContainer.classList.add("is-play");

      if (data.model === data.answer) {
        // 정답
        $answerContainer.classList.add("is-correct");
        playCorrectSound();
      } else {
        // 오답
        $answerContainer.classList.add("is-wrong");
        playWrongSound();

        await sleep(1000);

        // 정답 표시
        $answerContainer.querySelector("input").classList.add("is-blink");
        $answerContainer.classList.remove("is-play");
        // $answerContainer.classList.remove("is-wrong");
        data.model = data.answer;
      }

      checkSolveCount();
      $answerContainer.classList.add("lock");
    };

    // 매칭형
    const matchAnswer = async (event, index, position) => {
      const target = event.currentTarget;

      // 새롭게 선택했을 경우
      if (!sampleData[index].firstSelect) {
        target.classList.add("is-selected");

        sampleData[index].firstSelect = target;
        sampleData[index].firstPosition = position;

        return;
      }

      // 같은 쪽에서 선택했을 경우
      if (sampleData[index].firstPosition === position) {
        // 같은걸 선택했을 경우
        if (sampleData[index].firstSelect === target) {
          target.classList.remove("is-selected");

          sampleData[index].firstSelect = null;
          sampleData[index].firstPosition = null;

          return;
        }

        sampleData[index].firstSelect.classList.remove("is-selected");

        target.classList.add("is-selected");

        sampleData[index].firstSelect = target;
        sampleData[index].firstPosition = position;

        return;
      }

      const firstSelectIndex =
        sampleData[index].firstSelect.dataset.answerIndex;
      const $answerContainer = target.closest(".practice-answer");

      sampleData[index].firstSelect.classList.remove("is-selected");
      target.classList.remove("is-selected");
      $answerContainer.classList.add("lock");

      if (target.dataset.answerIndex === firstSelectIndex) {
        // 정답
        sampleData[index].firstSelect.classList.add("is-correct");
        target.classList.add("is-correct");

        playCorrectSound();
      } else {
        // 오답
        sampleData[index].firstSelect.classList.add("is-wrong");
        target.classList.add("is-wrong");

        playWrongSound();

        await sleep(1000);

        sampleData[index].firstSelect.classList.remove("is-wrong");
        target.classList.remove("is-wrong");

        // 정답 표시
        const realAnswer = $answerContainer.querySelectorAll(
          "[data-answer-index='" + firstSelectIndex + "']"
        );

        realAnswer.forEach((element) => {
          element.classList.add("is-correct", "is-blink");
        });
      }

      sampleData[index].firstSelect = null;
      sampleData[index].firstPosition = null;
      sampleData[index].matchCount++;

      if (sampleData[index].matchCount >= sampleData[index].view.length) {
        checkSolveCount();
      } else {
        $answerContainer.classList.remove("lock");
      }
    };

    const checkSolveCount = async () => {
      solveCount.value++;

      // 문제를 다 풀었을 경우
      if (solveCount.value >= sampleData.length) {
        /* await sleep(1000);

        vm.$appRouter.push({ name: "Home" }); */
      }
    };

    return {
      sampleData,
      isSoundPlay,
      enterAnswer,
      matchAnswer,
    };
  },
};
</script>
