import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import TravlPiinsAmfindslayt from '../TravlPiinsAmfindscmp/TravlPiinsAmfindslayt';
import {
  travlPiinsAmfindsPickQuizRound,
  travlPiinsAmfindsQuizRoundSize,
  type TravlPiinsAmfindsQuizQuestion,
} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsQuizData';
import {
  travlPiinsAmfindsLoadQuizBest,
  travlPiinsAmfindsUpdateQuizBest,
  type TravlPiinsAmfindsQuizBest,
} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsQuizStorage';

const travlPiinsAmfindsOrange = '#F0A030';
const travlPiinsAmfindsGreen = '#26D07C';
const travlPiinsAmfindsRed = '#EF4444';
const travlPiinsAmfindsPurple = '#A78BFA';
const travlPiinsAmfindsCard = '#2A2A2A';
const travlPiinsAmfindsInner = '#373737';
const travlPiinsAmfindsBorder = '#3B3737';
const travlPiinsAmfindsMuted = '#6B7278';
const travlPiinsAmfindsTitleC = '#EDF3FC';

const travlPiinsAmfindsOptionLetters = ['A', 'B', 'C', 'D'] as const;

type TravlPiinsAmfindsQuizPhase = 'intro' | 'playing' | 'results';

type TravlPiinsAmfindsQuizAnswer = {
  travlPiinsAmfindsQuestionId: string;
  travlPiinsAmfindsSelectedIndex: number;
  travlPiinsAmfindsIsCorrect: boolean;
};

function travlPiinsAmfindsFormatTime(travlPiinsAmfindsSec: number) {
  const m = Math.floor(travlPiinsAmfindsSec / 60);
  const s = travlPiinsAmfindsSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function travlPiinsAmfindsDashOr(
  travlPiinsAmfindsValue: string | null | undefined,
) {
  return travlPiinsAmfindsValue ?? '—';
}

const TravlPiinsAmfindsquizz = (): React.JSX.Element => {
  const travlPiinsAmfindsInsets = useSafeAreaInsets();
  const travlPiinsAmfindsAdvanceRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const [travlPiinsAmfindsPhase, settravlPiinsAmfindsPhase] =
    useState<TravlPiinsAmfindsQuizPhase>('intro');
  const [travlPiinsAmfindsPaused, settravlPiinsAmfindsPaused] = useState(false);
  const [travlPiinsAmfindsQuestionIdx, settravlPiinsAmfindsQuestionIdx] =
    useState(0);
  const [travlPiinsAmfindsSelectedIdx, settravlPiinsAmfindsSelectedIdx] =
    useState<number | null>(null);
  const [travlPiinsAmfindsRevealed, settravlPiinsAmfindsRevealed] =
    useState(false);
  const [travlPiinsAmfindsAnswers, settravlPiinsAmfindsAnswers] = useState<
    TravlPiinsAmfindsQuizAnswer[]
  >([]);
  const [travlPiinsAmfindsElapsedSec, settravlPiinsAmfindsElapsedSec] =
    useState(0);
  const [travlPiinsAmfindsBest, settravlPiinsAmfindsBest] =
    useState<TravlPiinsAmfindsQuizBest | null>(null);
  const [travlPiinsAmfindsFinalScore, settravlPiinsAmfindsFinalScore] =
    useState(0);
  const [travlPiinsAmfindsFinalTime, settravlPiinsAmfindsFinalTime] =
    useState(0);
  const [travlPiinsAmfindsSessionQuestions, settravlPiinsAmfindsSessionQuestions] =
    useState<TravlPiinsAmfindsQuizQuestion[]>([]);

  const travlPiinsAmfindsSessionCount = travlPiinsAmfindsSessionQuestions.length;

  const travlPiinsAmfindsCurrentQ =
    travlPiinsAmfindsSessionQuestions[travlPiinsAmfindsQuestionIdx];

  const travlPiinsAmfindsCorrectSoFar = travlPiinsAmfindsAnswers.filter(
    a => a.travlPiinsAmfindsIsCorrect,
  ).length;

  const travlPiinsAmfindsProgressPct =
    travlPiinsAmfindsSessionCount > 0
      ? Math.round(
          ((travlPiinsAmfindsQuestionIdx + (travlPiinsAmfindsRevealed ? 1 : 0)) /
            travlPiinsAmfindsSessionCount) *
            100,
        )
      : 0;

  const travlPiinsAmfindsReloadBest = useCallback(() => {
    travlPiinsAmfindsLoadQuizBest()
      .then(settravlPiinsAmfindsBest)
      .catch(() => {});
  }, []);

  useEffect(() => {
    travlPiinsAmfindsReloadBest();
    return () => {
      if (travlPiinsAmfindsAdvanceRef.current) {
        clearTimeout(travlPiinsAmfindsAdvanceRef.current);
      }
    };
  }, [travlPiinsAmfindsReloadBest]);

  useEffect(() => {
    if (travlPiinsAmfindsPhase !== 'playing' || travlPiinsAmfindsPaused) {
      return;
    }
    const id = setInterval(() => {
      settravlPiinsAmfindsElapsedSec(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [travlPiinsAmfindsPhase, travlPiinsAmfindsPaused]);

  useEffect(() => {
    if (travlPiinsAmfindsPaused && travlPiinsAmfindsAdvanceRef.current) {
      clearTimeout(travlPiinsAmfindsAdvanceRef.current);
      travlPiinsAmfindsAdvanceRef.current = null;
    }
  }, [travlPiinsAmfindsPaused]);

  const travlPiinsAmfindsFinishQuiz = useCallback(
    (travlPiinsAmfindsAnswersFinal: TravlPiinsAmfindsQuizAnswer[]) => {
      const score = travlPiinsAmfindsAnswersFinal.filter(
        a => a.travlPiinsAmfindsIsCorrect,
      ).length;
      settravlPiinsAmfindsFinalScore(score);
      settravlPiinsAmfindsFinalTime(travlPiinsAmfindsElapsedSec);
      settravlPiinsAmfindsPhase('results');
      travlPiinsAmfindsUpdateQuizBest(score, travlPiinsAmfindsElapsedSec)
        .then(settravlPiinsAmfindsBest)
        .catch(() => {});
    },
    [travlPiinsAmfindsElapsedSec],
  );

  const travlPiinsAmfindsGoNextQuestion = useCallback(
    (
      travlPiinsAmfindsAnswersNext: TravlPiinsAmfindsQuizAnswer[],
      travlPiinsAmfindsFromIdx: number,
    ) => {
      if (travlPiinsAmfindsFromIdx >= travlPiinsAmfindsSessionCount - 1) {
        travlPiinsAmfindsFinishQuiz(travlPiinsAmfindsAnswersNext);
        return;
      }
      settravlPiinsAmfindsQuestionIdx(travlPiinsAmfindsFromIdx + 1);
      settravlPiinsAmfindsSelectedIdx(null);
      settravlPiinsAmfindsRevealed(false);
    },
    [travlPiinsAmfindsFinishQuiz, travlPiinsAmfindsSessionCount],
  );

  const travlPiinsAmfindsStartQuiz = () => {
    if (travlPiinsAmfindsAdvanceRef.current) {
      clearTimeout(travlPiinsAmfindsAdvanceRef.current);
    }
    settravlPiinsAmfindsSessionQuestions(travlPiinsAmfindsPickQuizRound());
    settravlPiinsAmfindsPhase('playing');
    settravlPiinsAmfindsPaused(false);
    settravlPiinsAmfindsQuestionIdx(0);
    settravlPiinsAmfindsSelectedIdx(null);
    settravlPiinsAmfindsRevealed(false);
    settravlPiinsAmfindsAnswers([]);
    settravlPiinsAmfindsElapsedSec(0);
  };

  const travlPiinsAmfindsGoHome = () => {
    if (travlPiinsAmfindsAdvanceRef.current) {
      clearTimeout(travlPiinsAmfindsAdvanceRef.current);
    }
    settravlPiinsAmfindsPhase('intro');
    settravlPiinsAmfindsPaused(false);
    settravlPiinsAmfindsQuestionIdx(0);
    settravlPiinsAmfindsSelectedIdx(null);
    settravlPiinsAmfindsRevealed(false);
    settravlPiinsAmfindsAnswers([]);
    settravlPiinsAmfindsElapsedSec(0);
    settravlPiinsAmfindsSessionQuestions([]);
    travlPiinsAmfindsReloadBest();
  };

  const travlPiinsAmfindsPickOption = (
    travlPiinsAmfindsOptionIdx: number,
    travlPiinsAmfindsQ: TravlPiinsAmfindsQuizQuestion,
  ) => {
    if (travlPiinsAmfindsRevealed || travlPiinsAmfindsPaused) {
      return;
    }
    const travlPiinsAmfindsIsCorrect =
      travlPiinsAmfindsOptionIdx ===
      travlPiinsAmfindsQ.travlPiinsAmfindsCorrectIndex;
    const travlPiinsAmfindsEntry: TravlPiinsAmfindsQuizAnswer = {
      travlPiinsAmfindsQuestionId: travlPiinsAmfindsQ.travlPiinsAmfindsId,
      travlPiinsAmfindsSelectedIndex: travlPiinsAmfindsOptionIdx,
      travlPiinsAmfindsIsCorrect: travlPiinsAmfindsIsCorrect,
    };
    const travlPiinsAmfindsAnswersNext = [
      ...travlPiinsAmfindsAnswers,
      travlPiinsAmfindsEntry,
    ];
    settravlPiinsAmfindsSelectedIdx(travlPiinsAmfindsOptionIdx);
    settravlPiinsAmfindsRevealed(true);
    settravlPiinsAmfindsAnswers(travlPiinsAmfindsAnswersNext);

    if (travlPiinsAmfindsAdvanceRef.current) {
      clearTimeout(travlPiinsAmfindsAdvanceRef.current);
    }
    travlPiinsAmfindsAdvanceRef.current = setTimeout(() => {
      travlPiinsAmfindsGoNextQuestion(
        travlPiinsAmfindsAnswersNext,
        travlPiinsAmfindsQuestionIdx,
      );
    }, 1400);
  };

  const travlPiinsAmfindsRenderIntro = () => (
    <View
      style={[
        styles.travlPiinsAmfindsIntroRoot,
        {paddingBottom: 24 + travlPiinsAmfindsInsets.bottom},
      ]}>
      <ImageBackground
        source={require('../../assets/imgs/quizIntro.jpg')}
        style={styles.travlPiinsAmfindsHero}
        imageStyle={styles.travlPiinsAmfindsHeroImg}>
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.1)',
            'rgba(18,18,18,0.95)',
            'rgba(0, 0, 0, 0.95)',
          ]}
          locations={[0.35, 0.85, 1]}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>
      <View style={styles.travlPiinsAmfindsIntroBody}>
        <View style={styles.travlPiinsAmfindsTriviaBadge}>
          <Image source={require('../../assets/imgs/fireIcon.png')} />
          <Text style={styles.travlPiinsAmfindsTriviaTxt}>TRAVEL TRIVIA</Text>
        </View>
        <Text style={styles.travlPiinsAmfindsIntroTitle}>
          World Explorer Quiz
        </Text>
        <Text style={styles.travlPiinsAmfindsIntroDesc}>
          Test your knowledge of world geography, famous landmarks, and travel
          facts. {travlPiinsAmfindsQuizRoundSize} questions per round. How many
          can you get right?
        </Text>
        <View style={styles.travlPiinsAmfindsStatsRow}>
          <View style={styles.travlPiinsAmfindsStatCard}>
            <Text style={styles.travlPiinsAmfindsStatIcon}>❓</Text>
            <Text style={styles.travlPiinsAmfindsStatVal}>
              {travlPiinsAmfindsQuizRoundSize}
            </Text>
            <Text style={styles.travlPiinsAmfindsStatLbl}>Questions</Text>
          </View>
          <View style={styles.travlPiinsAmfindsStatCard}>
            <Text style={styles.travlPiinsAmfindsStatIcon}>🏆</Text>
            <Text style={styles.travlPiinsAmfindsStatVal}>
              {travlPiinsAmfindsBest
                ? `${travlPiinsAmfindsBest.travlPiinsAmfindsBestScore}/${travlPiinsAmfindsQuizRoundSize}`
                : '—'}
            </Text>
            <Text style={styles.travlPiinsAmfindsStatLbl}>Best Score</Text>
          </View>
          <View style={styles.travlPiinsAmfindsStatCard}>
            <Text style={styles.travlPiinsAmfindsStatIcon}>⏱</Text>
            <Text style={styles.travlPiinsAmfindsStatVal}>
              {travlPiinsAmfindsBest
                ? travlPiinsAmfindsFormatTime(
                    travlPiinsAmfindsBest.travlPiinsAmfindsBestTimeSec,
                  )
                : '—'}
            </Text>
            <Text style={styles.travlPiinsAmfindsStatLbl}>Best Time</Text>
          </View>
        </View>
        <Pressable
          onPress={travlPiinsAmfindsStartQuiz}
          style={({pressed}) => [
            styles.travlPiinsAmfindsStartBtn,
            pressed && styles.travlPiinsAmfindsPressed,
          ]}>
          <Image source={require('../../assets/imgs/playIcon.png')} />
          <Text style={styles.travlPiinsAmfindsStartTxt}>Start Quiz</Text>
        </Pressable>
      </View>
    </View>
  );

  const travlPiinsAmfindsRenderOption = (
    travlPiinsAmfindsOptionIdx: number,
    travlPiinsAmfindsLabel: string,
    travlPiinsAmfindsQ: TravlPiinsAmfindsQuizQuestion,
  ) => {
    const travlPiinsAmfindsIsCorrectOpt =
      travlPiinsAmfindsOptionIdx ===
      travlPiinsAmfindsQ.travlPiinsAmfindsCorrectIndex;
    const travlPiinsAmfindsIsSelected =
      travlPiinsAmfindsSelectedIdx === travlPiinsAmfindsOptionIdx;
    const travlPiinsAmfindsShowWrong =
      travlPiinsAmfindsRevealed &&
      travlPiinsAmfindsIsSelected &&
      !travlPiinsAmfindsIsCorrectOpt;
    const travlPiinsAmfindsShowCorrect =
      travlPiinsAmfindsRevealed && travlPiinsAmfindsIsCorrectOpt;

    return (
      <Pressable
        key={travlPiinsAmfindsOptionIdx}
        onPress={() =>
          travlPiinsAmfindsPickOption(
            travlPiinsAmfindsOptionIdx,
            travlPiinsAmfindsQ,
          )
        }
        disabled={travlPiinsAmfindsRevealed || travlPiinsAmfindsPaused}
        style={[
          styles.travlPiinsAmfindsOption,
          travlPiinsAmfindsShowWrong && styles.travlPiinsAmfindsOptionWrong,
          travlPiinsAmfindsShowCorrect && styles.travlPiinsAmfindsOptionRight,
        ]}>
        <View
          style={[
            styles.travlPiinsAmfindsOptionLetter,
            travlPiinsAmfindsShowWrong &&
              styles.travlPiinsAmfindsOptionLetterWrong,
            travlPiinsAmfindsShowCorrect &&
              styles.travlPiinsAmfindsOptionLetterRight,
          ]}>
          <Text
            style={[
              styles.travlPiinsAmfindsOptionLetterTxt,
              travlPiinsAmfindsShowWrong &&
                styles.travlPiinsAmfindsOptionTxtWrong,
              travlPiinsAmfindsShowCorrect &&
                styles.travlPiinsAmfindsOptionTxtRight,
            ]}>
            {travlPiinsAmfindsOptionLetters[travlPiinsAmfindsOptionIdx]}
          </Text>
        </View>
        <Text
          style={[
            styles.travlPiinsAmfindsOptionTxt,
            travlPiinsAmfindsShowWrong &&
              styles.travlPiinsAmfindsOptionTxtWrong,
            travlPiinsAmfindsShowCorrect &&
              styles.travlPiinsAmfindsOptionTxtRight,
          ]}>
          {travlPiinsAmfindsLabel}
        </Text>
        {travlPiinsAmfindsShowWrong ? (
          <View style={styles.travlPiinsAmfindsOptionMarkWrong}>
            <Image source={require('../../assets/imgs/wrongMark.png')} />
          </View>
        ) : null}
        {travlPiinsAmfindsShowCorrect ? (
          <View style={styles.travlPiinsAmfindsOptionMarkRight}>
            <Image source={require('../../assets/imgs/checkOk.png')} />
          </View>
        ) : null}
      </Pressable>
    );
  };

  const travlPiinsAmfindsRenderPlaying = () => {
    if (!travlPiinsAmfindsCurrentQ) {
      return null;
    }
    const travlPiinsAmfindsQNum = travlPiinsAmfindsQuestionIdx + 1;
    const travlPiinsAmfindsScoreShown = travlPiinsAmfindsRevealed
      ? travlPiinsAmfindsCorrectSoFar
      : travlPiinsAmfindsAnswers.filter(a => a.travlPiinsAmfindsIsCorrect)
          .length;
    const travlPiinsAmfindsDenom = travlPiinsAmfindsRevealed
      ? travlPiinsAmfindsAnswers.length
      : Math.max(travlPiinsAmfindsAnswers.length, 0);

    return (
      <View
        style={[
          styles.travlPiinsAmfindsPlayRoot,
          {
            paddingTop: 12 + travlPiinsAmfindsInsets.top,
            paddingBottom: 20 + travlPiinsAmfindsInsets.bottom,
          },
        ]}>
        <View style={styles.travlPiinsAmfindsPlayTop}>
          <Text style={styles.travlPiinsAmfindsQLabel}>
            Question{' '}
            <Text style={styles.travlPiinsAmfindsQNum}>
              {travlPiinsAmfindsQNum}
            </Text>
            {' of '}
            {travlPiinsAmfindsSessionCount || travlPiinsAmfindsQuizRoundSize}
          </Text>
          <View style={styles.travlPiinsAmfindsPlayTopRight}>
            <View style={styles.travlPiinsAmfindsTimerPill}>
              <Image source={require('../../assets/imgs/clockIcon.png')} />
              <Text style={styles.travlPiinsAmfindsTimerTxt}>
                {travlPiinsAmfindsFormatTime(travlPiinsAmfindsElapsedSec)}
              </Text>
            </View>
            <Pressable
              onPress={() => settravlPiinsAmfindsPaused(true)}
              style={({pressed}) => [
                styles.travlPiinsAmfindsPauseBtn,
                pressed && styles.travlPiinsAmfindsPressed,
              ]}>
              <Image
                source={require('../../assets/imgs/pauseIcon.png')}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.travlPiinsAmfindsProgressTrack}>
          <View
            style={[
              styles.travlPiinsAmfindsProgressFill,
              {width: `${travlPiinsAmfindsProgressPct}%`},
            ]}
          />
        </View>
        <View style={styles.travlPiinsAmfindsScoreRow}>
          <Text style={styles.travlPiinsAmfindsScoreMeta}>
            Score: {travlPiinsAmfindsScoreShown}/{travlPiinsAmfindsDenom}
          </Text>
          <Text style={styles.travlPiinsAmfindsScoreMeta}>
            {travlPiinsAmfindsProgressPct}%
          </Text>
        </View>

        <View style={styles.travlPiinsAmfindsQuestionCard}>
          <View style={styles.travlPiinsAmfindsQuestionIcon}>
            <Text style={styles.travlPiinsAmfindsQuestionEmoji}>
              {travlPiinsAmfindsCurrentQ.travlPiinsAmfindsEmoji}
            </Text>
          </View>
          <Text style={styles.travlPiinsAmfindsQuestionTxt}>
            {travlPiinsAmfindsCurrentQ.travlPiinsAmfindsPrompt}
          </Text>
        </View>

        <View style={styles.travlPiinsAmfindsOptions}>
          {travlPiinsAmfindsCurrentQ.travlPiinsAmfindsOptions.map((opt, idx) =>
            travlPiinsAmfindsRenderOption(idx, opt, travlPiinsAmfindsCurrentQ),
          )}
        </View>
        {travlPiinsAmfindsRevealed ? (
          <Text style={styles.travlPiinsAmfindsExplainBox}>
            {travlPiinsAmfindsCurrentQ.travlPiinsAmfindsExplanation}
          </Text>
        ) : null}
      </View>
    );
  };

  const travlPiinsAmfindsRenderResults = () => {
    const travlPiinsAmfindsPct =
      travlPiinsAmfindsSessionCount > 0
        ? Math.round(
            (travlPiinsAmfindsFinalScore / travlPiinsAmfindsSessionCount) * 100,
          )
        : 0;
    const travlPiinsAmfindsBestScoreTxt = travlPiinsAmfindsDashOr(
      travlPiinsAmfindsBest
        ? `${travlPiinsAmfindsBest.travlPiinsAmfindsBestScore}/${travlPiinsAmfindsQuizRoundSize}`
        : null,
    );
    const travlPiinsAmfindsBestTimeTxt = travlPiinsAmfindsDashOr(
      travlPiinsAmfindsBest
        ? travlPiinsAmfindsFormatTime(
            travlPiinsAmfindsBest.travlPiinsAmfindsBestTimeSec,
          )
        : null,
    );

    return (
      <View
        style={[
          styles.travlPiinsAmfindsResultsRoot,
          {
            paddingTop: 16 + travlPiinsAmfindsInsets.top,
            paddingBottom: 24 + travlPiinsAmfindsInsets.bottom,
          },
        ]}>
        <View style={styles.travlPiinsAmfindsScoreCircleWrap}>
          <View style={styles.travlPiinsAmfindsScoreCircle}>
            <Text style={styles.travlPiinsAmfindsScoreBig}>
              {travlPiinsAmfindsFinalScore}{' '}
              <Text style={styles.travlPiinsAmfindsScoreSmall}>
                /{travlPiinsAmfindsSessionCount}
              </Text>
            </Text>
          </View>
        </View>
        <Text style={styles.travlPiinsAmfindsPctLbl}>
          {travlPiinsAmfindsPct}% correct answers
        </Text>

        <View style={styles.travlPiinsAmfindsResultsGrid}>
          <View style={styles.travlPiinsAmfindsResultStat}>
            <Image source={require('../../assets/imgs/correctMark.png')} />
            <Text
              style={[
                styles.travlPiinsAmfindsResultStatVal,
                {color: travlPiinsAmfindsOrange},
              ]}>
              {travlPiinsAmfindsFinalScore}/{travlPiinsAmfindsSessionCount}
            </Text>
            <Text style={styles.travlPiinsAmfindsResultStatLbl}>
              Current Score
            </Text>
          </View>
          <View style={styles.travlPiinsAmfindsResultStat}>
            <Image source={require('../../assets/imgs/timerIcon.png')} />
            <Text
              style={[
                styles.travlPiinsAmfindsResultStatVal,
                {color: travlPiinsAmfindsOrange},
              ]}>
              {travlPiinsAmfindsFormatTime(travlPiinsAmfindsFinalTime)}
            </Text>
            <Text style={styles.travlPiinsAmfindsResultStatLbl}>
              Completion Time
            </Text>
          </View>
          <View style={styles.travlPiinsAmfindsResultStat}>
            <Image source={require('../../assets/imgs/wrongCountIcon.png')} />
            <Text
              style={[
                styles.travlPiinsAmfindsResultStatVal,
                {color: travlPiinsAmfindsPurple},
              ]}>
              {travlPiinsAmfindsBestScoreTxt}
            </Text>
            <Text style={styles.travlPiinsAmfindsResultStatLbl}>
              Best Score
            </Text>
          </View>
          <View style={styles.travlPiinsAmfindsResultStat}>
            <Image source={require('../../assets/imgs/attemptsIcon.png')} />
            <Text
              style={[
                styles.travlPiinsAmfindsResultStatVal,
                {color: travlPiinsAmfindsGreen},
              ]}>
              {travlPiinsAmfindsBestTimeTxt}
            </Text>
            <Text style={styles.travlPiinsAmfindsResultStatLbl}>Best Time</Text>
          </View>
        </View>

        <View style={styles.travlPiinsAmfindsReviewCard}>
          <Text style={styles.travlPiinsAmfindsReviewTitle}>Answer Review</Text>
          {travlPiinsAmfindsSessionQuestions.map((q, idx) => {
            const ans = travlPiinsAmfindsAnswers.find(
              a => a.travlPiinsAmfindsQuestionId === q.travlPiinsAmfindsId,
            );
            const travlPiinsAmfindsOk =
              ans?.travlPiinsAmfindsIsCorrect ?? false;
            const travlPiinsAmfindsCorrectLabel =
              q.travlPiinsAmfindsOptions[q.travlPiinsAmfindsCorrectIndex];
            return (
              <View
                key={q.travlPiinsAmfindsId}
                style={[
                  styles.travlPiinsAmfindsReviewRow,
                  idx < travlPiinsAmfindsSessionQuestions.length - 1 &&
                    styles.travlPiinsAmfindsReviewRowBorder,
                ]}>
                <View>
                  {travlPiinsAmfindsOk ? (
                    <Image
                      source={require('../../assets/imgs/checkOk.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/imgs/wrongMark.png')}
                    />
                  )}
                </View>
                <View style={styles.travlPiinsAmfindsReviewMid}>
                  <Text style={styles.travlPiinsAmfindsReviewQ}>
                    Q{idx + 1}. {q.travlPiinsAmfindsPrompt}
                  </Text>
                  {!travlPiinsAmfindsOk ? (
                    <>
                      <Text style={styles.travlPiinsAmfindsReviewCorrect}>
                        ✓ {travlPiinsAmfindsCorrectLabel}
                      </Text>
                      <Text style={styles.travlPiinsAmfindsReviewExplain}>
                        {q.travlPiinsAmfindsExplanation}
                      </Text>
                    </>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>

        <Pressable
          onPress={travlPiinsAmfindsGoHome}
          style={({pressed}) => [
            styles.travlPiinsAmfindsHomeBtn,
            pressed && styles.travlPiinsAmfindsPressed,
          ]}>
          <Text style={styles.travlPiinsAmfindsHomeBtnTxt}>Home</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <TravlPiinsAmfindslayt bounce={false}>
      {travlPiinsAmfindsPhase === 'intro'
        ? travlPiinsAmfindsRenderIntro()
        : null}
      {travlPiinsAmfindsPhase === 'playing'
        ? travlPiinsAmfindsRenderPlaying()
        : null}
      {travlPiinsAmfindsPhase === 'results'
        ? travlPiinsAmfindsRenderResults()
        : null}

      <Modal
        visible={travlPiinsAmfindsPaused}
        transparent
        animationType="fade"
        onRequestClose={() => settravlPiinsAmfindsPaused(false)}>
        <View style={styles.travlPiinsAmfindsPauseOverlay}>
          <View style={styles.travlPiinsAmfindsPauseCard}>
            <View style={styles.travlPiinsAmfindsPauseIconWrap}>
              <Image source={require('../../assets/imgs/playResume.png')} />
            </View>
            <Text style={styles.travlPiinsAmfindsPauseTitle}>Quiz Paused</Text>
            <Text style={styles.travlPiinsAmfindsPauseSub}>
              Take a breath. Your progress is saved.
            </Text>
            <View style={styles.travlPiinsAmfindsPauseInfo}>
              <Image source={require('../../assets/imgs/clockIcon.png')} />
              <Text style={styles.travlPiinsAmfindsPauseInfoTime}>
                {travlPiinsAmfindsFormatTime(travlPiinsAmfindsElapsedSec)}
              </Text>
              <Text style={styles.travlPiinsAmfindsPauseInfoDot}>·</Text>
              <Text style={styles.travlPiinsAmfindsPauseInfoQ}>
                Q{travlPiinsAmfindsQuestionIdx + 1} of{' '}
                {travlPiinsAmfindsSessionCount || travlPiinsAmfindsQuizRoundSize}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                settravlPiinsAmfindsPaused(false);
                if (travlPiinsAmfindsRevealed) {
                  travlPiinsAmfindsGoNextQuestion(
                    travlPiinsAmfindsAnswers,
                    travlPiinsAmfindsQuestionIdx,
                  );
                }
              }}
              style={({pressed}) => [
                styles.travlPiinsAmfindsContinueBtn,
                pressed && styles.travlPiinsAmfindsPressed,
              ]}>
              <Image source={require('../../assets/imgs/playIcon.png')} />
              <Text style={styles.travlPiinsAmfindsContinueTxt}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </TravlPiinsAmfindslayt>
  );
};

export default TravlPiinsAmfindsquizz;

const styles = StyleSheet.create({
  travlPiinsAmfindsPressed: {opacity: 0.92},
  travlPiinsAmfindsIntroRoot: {flexGrow: 1},
  travlPiinsAmfindsHero: {height: 380, width: '100%'},
  travlPiinsAmfindsHeroImg: {resizeMode: 'cover'},
  travlPiinsAmfindsIntroBody: {
    paddingHorizontal: 20,
    marginTop: 14,
    gap: 14,
  },
  travlPiinsAmfindsTriviaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(240,160,48,0.45)',
    backgroundColor: '#F0A03020',
  },
  travlPiinsAmfindsTriviaIcon: {fontSize: 12},
  travlPiinsAmfindsTriviaTxt: {
    color: travlPiinsAmfindsOrange,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  travlPiinsAmfindsIntroTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.35,
  },
  travlPiinsAmfindsIntroDesc: {
    color: '#6B7278',
    fontSize: 15,
    lineHeight: 22,
  },
  travlPiinsAmfindsStatsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  travlPiinsAmfindsStatCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsStatIcon: {fontSize: 18},
  travlPiinsAmfindsStatVal: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 18,
    fontWeight: '700',
  },
  travlPiinsAmfindsStatLbl: {
    color: travlPiinsAmfindsMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  travlPiinsAmfindsStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: travlPiinsAmfindsOrange,
    borderRadius: 18,
    height: 63,
    marginTop: 2,
  },
  travlPiinsAmfindsStartPlay: {
    color: '#111',
    fontSize: 14,
    fontWeight: '800',
  },
  travlPiinsAmfindsStartTxt: {
    color: '#111',
    fontSize: 18,
    fontWeight: '800',
  },
  travlPiinsAmfindsPlayRoot: {
    flex: 1,
    paddingHorizontal: 20,
    minHeight: 500,
  },
  travlPiinsAmfindsPlayTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  travlPiinsAmfindsQLabel: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  travlPiinsAmfindsQNum: {
    color: travlPiinsAmfindsTitleC,
    fontWeight: '800',
  },
  travlPiinsAmfindsPlayTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  travlPiinsAmfindsTimerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 70,

    justifyContent: 'center',
    backgroundColor: '#373737',
  },
  travlPiinsAmfindsTimerIcon: {fontSize: 12},
  travlPiinsAmfindsTimerTxt: {
    color: travlPiinsAmfindsOrange,
    fontSize: 13,
    fontWeight: '700',
  },
  travlPiinsAmfindsPauseBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: travlPiinsAmfindsCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsPauseIcon: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 16,
    fontWeight: '700',
  },
  travlPiinsAmfindsProgressTrack: {
    height: 4,
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  travlPiinsAmfindsProgressFill: {
    height: '100%',
    backgroundColor: travlPiinsAmfindsGreen,
    borderRadius: 2,
  },
  travlPiinsAmfindsScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  travlPiinsAmfindsScoreMeta: {
    color: travlPiinsAmfindsMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  travlPiinsAmfindsQuestionCard: {
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    gap: 14,
  },
  travlPiinsAmfindsQuestionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0A03020',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0A03030',
  },
  travlPiinsAmfindsQuestionEmoji: {fontSize: 15},
  travlPiinsAmfindsQuestionTxt: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
  },
  travlPiinsAmfindsOptions: {gap: 10},
  travlPiinsAmfindsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#3B3737',
  },
  travlPiinsAmfindsOptionWrong: {
    borderColor: travlPiinsAmfindsRed,
    backgroundColor: 'rgba(239,68,68,0.08)',
  },
  travlPiinsAmfindsOptionRight: {
    borderColor: travlPiinsAmfindsGreen,
    backgroundColor: 'rgba(38,208,124,0.08)',
  },
  travlPiinsAmfindsOptionLetter: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: travlPiinsAmfindsInner,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsOptionLetterWrong: {
    backgroundColor: 'rgba(239,68,68,0.15)',
  },
  travlPiinsAmfindsOptionLetterRight: {
    backgroundColor: 'rgba(38,208,124,0.15)',
  },
  travlPiinsAmfindsOptionLetterTxt: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    fontWeight: '800',
  },
  travlPiinsAmfindsOptionTxt: {
    flex: 1,
    color: travlPiinsAmfindsTitleC,
    fontSize: 16,
    fontWeight: '600',
  },
  travlPiinsAmfindsOptionTxtWrong: {color: travlPiinsAmfindsRed},
  travlPiinsAmfindsOptionTxtRight: {color: travlPiinsAmfindsGreen},
  travlPiinsAmfindsOptionMarkWrong: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsOptionMarkRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsOptionMarkTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  travlPiinsAmfindsPauseOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  travlPiinsAmfindsPauseCard: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    gap: 12,
  },
  travlPiinsAmfindsPauseIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 46,
    backgroundColor: '#373737',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsPauseIconLarge: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 28,
  },
  travlPiinsAmfindsPauseTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 24,
    fontWeight: '800',
  },
  travlPiinsAmfindsPauseSub: {
    color: travlPiinsAmfindsMuted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  travlPiinsAmfindsPauseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 4,
  },
  travlPiinsAmfindsPauseInfoTime: {
    color: travlPiinsAmfindsOrange,
    fontSize: 15,
    fontWeight: '800',
  },
  travlPiinsAmfindsPauseInfoDot: {color: travlPiinsAmfindsMuted, fontSize: 14},
  travlPiinsAmfindsPauseInfoQ: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  travlPiinsAmfindsContinueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: travlPiinsAmfindsOrange,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '70%',
    marginTop: 8,
  },
  travlPiinsAmfindsContinuePlay: {
    color: '#111',
    fontSize: 14,
    fontWeight: '700',
  },
  travlPiinsAmfindsContinueTxt: {
    color: '#111',
    fontSize: 17,
    fontWeight: '800',
  },
  travlPiinsAmfindsResultsRoot: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  travlPiinsAmfindsScoreCircleWrap: {
    alignItems: 'center',
    marginBottom: 10,
  },
  travlPiinsAmfindsScoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'rgba(240,160,48,0.35)',
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: travlPiinsAmfindsOrange,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  travlPiinsAmfindsScoreBig: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 28,
    fontWeight: '800',
  },
  travlPiinsAmfindsScoreSmall: {
    color: '#6B7278',
    fontSize: 13,
    fontWeight: '400',
  },
  travlPiinsAmfindsPctLbl: {
    color: travlPiinsAmfindsMuted,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  travlPiinsAmfindsResultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  travlPiinsAmfindsResultStat: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 14,
    padding: 14,

    gap: 8,
    borderWidth: 1,
    borderColor: '#3B3737',
  },
  travlPiinsAmfindsResultStatIcon: {fontSize: 18},
  travlPiinsAmfindsResultStatVal: {fontSize: 18, fontWeight: '800'},
  travlPiinsAmfindsResultStatLbl: {
    color: travlPiinsAmfindsMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  travlPiinsAmfindsReviewCard: {
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsReviewTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  travlPiinsAmfindsReviewRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  travlPiinsAmfindsReviewRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsReviewIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsReviewIconOk: {backgroundColor: 'rgba(38,208,124,0.2)'},
  travlPiinsAmfindsReviewIconBad: {backgroundColor: 'rgba(239,68,68,0.2)'},
  travlPiinsAmfindsReviewIconTxt: {fontSize: 14, fontWeight: '800'},
  travlPiinsAmfindsReviewMid: {flex: 1, gap: 4},
  travlPiinsAmfindsReviewQ: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },
  travlPiinsAmfindsReviewCorrect: {
    color: travlPiinsAmfindsGreen,
    fontSize: 13,
    fontWeight: '600',
  },
  travlPiinsAmfindsReviewExplain: {
    color: travlPiinsAmfindsMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  travlPiinsAmfindsExplainBox: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    paddingHorizontal: 2,
  },
  travlPiinsAmfindsHomeBtn: {
    backgroundColor: travlPiinsAmfindsOrange,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  travlPiinsAmfindsHomeBtnTxt: {
    color: '#111',
    fontSize: 17,
    fontWeight: '800',
  },
});
