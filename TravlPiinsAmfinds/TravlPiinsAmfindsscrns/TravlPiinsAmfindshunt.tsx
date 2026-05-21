import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import TravlPiinsAmfindslayt from '../TravlPiinsAmfindscmp/TravlPiinsAmfindslayt';
import {
  travlPiinsAmfindsFindHuntTask,
  travlPiinsAmfindsHuntTasks,
  type TravlPiinsAmfindsHuntDifficulty,
  type TravlPiinsAmfindsHuntTask,
} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsHuntData';
import {
  travlPiinsAmfindsHuntCompletedTaskIds,
  travlPiinsAmfindsLoadHuntPhotos,
  travlPiinsAmfindsSaveHuntPhotos,
  type TravlPiinsAmfindsHuntPhoto,
} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsHuntStorage';

const travlPiinsAmfindsOrange = '#F0A030';
const travlPiinsAmfindsGreen = '#26D07C';
const travlPiinsAmfindsRed = '#EF4444';
const travlPiinsAmfindsCard = '#2A2A2A';
const travlPiinsAmfindsInner = '#373737';
const travlPiinsAmfindsBorder = '#3B3737';
const travlPiinsAmfindsMuted = '#6B7278';
const travlPiinsAmfindsTitleC = '#EDF3FC';

type TravlPiinsAmfindsHuntTab = 'tasks' | 'board';

const {width: travlPiinsAmfindsScreenW} = Dimensions.get('window');
const travlPiinsAmfindsGridGap = 12;
const travlPiinsAmfindsGridPad = 20;
const travlPiinsAmfindsGridCardW =
  (travlPiinsAmfindsScreenW -
    travlPiinsAmfindsGridPad * 2 -
    travlPiinsAmfindsGridGap) /
  2;

function travlPiinsAmfindsFormatBoardDate(travlPiinsAmfindsTs: number) {
  return new Date(travlPiinsAmfindsTs).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function travlPiinsAmfindsDiffColors(
  travlPiinsAmfindsD: TravlPiinsAmfindsHuntDifficulty,
) {
  if (travlPiinsAmfindsD === 'Easy') {
    return {
      bg: 'rgba(38,208,124,0.18)',
      color: travlPiinsAmfindsGreen,
    };
  }
  if (travlPiinsAmfindsD === 'Hard') {
    return {bg: 'rgba(239,68,68,0.18)', color: travlPiinsAmfindsRed};
  }
  return {bg: 'rgba(240,160,48,0.18)', color: travlPiinsAmfindsOrange};
}

const TravlPiinsAmfindshunt = (): React.JSX.Element => {
  const travlPiinsAmfindsInsets = useSafeAreaInsets();
  const [travlPiinsAmfindsTab, settravlPiinsAmfindsTab] =
    useState<TravlPiinsAmfindsHuntTab>('tasks');
  const [travlPiinsAmfindsPhotos, settravlPiinsAmfindsPhotos] = useState<
    TravlPiinsAmfindsHuntPhoto[]
  >([]);
  const [travlPiinsAmfindsBoardEdit, settravlPiinsAmfindsBoardEdit] =
    useState(false);
  const [travlPiinsAmfindsSelectTaskOpen, settravlPiinsAmfindsSelectTaskOpen] =
    useState(false);
  const [travlPiinsAmfindsDeletePhoto, settravlPiinsAmfindsDeletePhoto] =
    useState<TravlPiinsAmfindsHuntPhoto | null>(null);

  const travlPiinsAmfindsReload = useCallback(() => {
    travlPiinsAmfindsLoadHuntPhotos()
      .then(settravlPiinsAmfindsPhotos)
      .catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      travlPiinsAmfindsReload();
    }, [travlPiinsAmfindsReload]),
  );

  const travlPiinsAmfindsCompletedIds = useMemo(
    () => travlPiinsAmfindsHuntCompletedTaskIds(travlPiinsAmfindsPhotos),
    [travlPiinsAmfindsPhotos],
  );

  const travlPiinsAmfindsTotalTasks = travlPiinsAmfindsHuntTasks.length;
  const travlPiinsAmfindsCompletedCount = travlPiinsAmfindsCompletedIds.size;
  const travlPiinsAmfindsProgressPct =
    travlPiinsAmfindsTotalTasks > 0
      ? Math.round(
          (travlPiinsAmfindsCompletedCount / travlPiinsAmfindsTotalTasks) * 100,
        )
      : 0;

  const travlPiinsAmfindsPersistPhotos = async (
    travlPiinsAmfindsNext: TravlPiinsAmfindsHuntPhoto[],
  ) => {
    settravlPiinsAmfindsPhotos(travlPiinsAmfindsNext);
    await travlPiinsAmfindsSaveHuntPhotos(travlPiinsAmfindsNext);
  };

  const travlPiinsAmfindsAddPhoto = async (
    travlPiinsAmfindsTaskId: string,
    travlPiinsAmfindsUri: string,
  ) => {
    const travlPiinsAmfindsPhoto: TravlPiinsAmfindsHuntPhoto = {
      travlPiinsAmfindsId: `huntPhoto-${Date.now()}`,
      travlPiinsAmfindsTaskId: travlPiinsAmfindsTaskId,
      travlPiinsAmfindsUri: travlPiinsAmfindsUri,
      travlPiinsAmfindsCreatedAt: Date.now(),
    };
    await travlPiinsAmfindsPersistPhotos([
      ...travlPiinsAmfindsPhotos,
      travlPiinsAmfindsPhoto,
    ]);
    settravlPiinsAmfindsSelectTaskOpen(false);
  };

  const travlPiinsAmfindsPickImage = (travlPiinsAmfindsTaskId: string) => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 1, selectionLimit: 1},
      res => {
        if (res.didCancel || res.errorCode) {
          return;
        }
        const uri = res.assets?.[0]?.uri;
        if (uri) {
          travlPiinsAmfindsAddPhoto(travlPiinsAmfindsTaskId, uri).catch(
            () => {},
          );
        }
      },
    );
  };

  const travlPiinsAmfindsConfirmDelete = async () => {
    if (!travlPiinsAmfindsDeletePhoto) {
      return;
    }
    const travlPiinsAmfindsNext = travlPiinsAmfindsPhotos.filter(
      p =>
        p.travlPiinsAmfindsId !==
        travlPiinsAmfindsDeletePhoto.travlPiinsAmfindsId,
    );
    await travlPiinsAmfindsPersistPhotos(travlPiinsAmfindsNext);
    settravlPiinsAmfindsDeletePhoto(null);
  };

  const travlPiinsAmfindsLatestPhotoForTask = (
    travlPiinsAmfindsTaskId: string,
  ) => {
    const travlPiinsAmfindsForTask = travlPiinsAmfindsPhotos.filter(
      p => p.travlPiinsAmfindsTaskId === travlPiinsAmfindsTaskId,
    );
    return travlPiinsAmfindsForTask[travlPiinsAmfindsForTask.length - 1];
  };

  const travlPiinsAmfindsRenderTaskCard = (
    travlPiinsAmfindsTask: TravlPiinsAmfindsHuntTask,
  ) => {
    const travlPiinsAmfindsDone = travlPiinsAmfindsCompletedIds.has(
      travlPiinsAmfindsTask.travlPiinsAmfindsId,
    );
    const travlPiinsAmfindsDiff = travlPiinsAmfindsDiffColors(
      travlPiinsAmfindsTask.travlPiinsAmfindsDifficulty,
    );
    const travlPiinsAmfindsThumb = travlPiinsAmfindsLatestPhotoForTask(
      travlPiinsAmfindsTask.travlPiinsAmfindsId,
    );

    return (
      <View
        key={travlPiinsAmfindsTask.travlPiinsAmfindsId}
        style={[
          styles.travlPiinsAmfindsTaskCard,
          travlPiinsAmfindsDone && styles.travlPiinsAmfindsTaskCardDone,
        ]}>
        {travlPiinsAmfindsDone ? (
          <View style={styles.travlPiinsAmfindsDoneRibbon}>
            <Text style={styles.travlPiinsAmfindsDoneRibbonTxt}>✓ DONE</Text>
          </View>
        ) : null}
        <View style={styles.travlPiinsAmfindsTaskTop}>
          {travlPiinsAmfindsDone && travlPiinsAmfindsThumb ? (
            <Image
              source={{uri: travlPiinsAmfindsThumb.travlPiinsAmfindsUri}}
              style={styles.travlPiinsAmfindsTaskThumb}
            />
          ) : (
            <View
              style={[
                styles.travlPiinsAmfindsTaskIcon,
                travlPiinsAmfindsDone && styles.travlPiinsAmfindsTaskIconDone,
              ]}>
              <Image
                source={
                  travlPiinsAmfindsDone
                    ? require('../../assets/imgs/photoCompleted.png')
                    : require('../../assets/imgs/photoThumbnail.png')
                }
              />
            </View>
          )}
          <View style={styles.travlPiinsAmfindsTaskBadges}>
            <View
              style={[
                styles.travlPiinsAmfindsDiffBadge,
                {backgroundColor: travlPiinsAmfindsDiff.bg},
              ]}>
              <Text
                style={[
                  styles.travlPiinsAmfindsDiffTxt,
                  {color: travlPiinsAmfindsDiff.color},
                ]}>
                {travlPiinsAmfindsTask.travlPiinsAmfindsDifficulty}
              </Text>
            </View>
            <View style={styles.travlPiinsAmfindsTypeBadge}>
              <Text style={styles.travlPiinsAmfindsTypeTxt}>
                {travlPiinsAmfindsTask.travlPiinsAmfindsType}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.travlPiinsAmfindsTaskTitle}>
          {travlPiinsAmfindsTask.travlPiinsAmfindsTitle}
        </Text>
        <Text style={styles.travlPiinsAmfindsTaskDesc}>
          {travlPiinsAmfindsTask.travlPiinsAmfindsDescription}
        </Text>
        <Pressable
          onPress={() =>
            travlPiinsAmfindsPickImage(
              travlPiinsAmfindsTask.travlPiinsAmfindsId,
            )
          }
          style={({pressed}) => [
            travlPiinsAmfindsDone
              ? styles.travlPiinsAmfindsCaptureBtnDone
              : styles.travlPiinsAmfindsCaptureBtn,
            pressed && styles.travlPiinsAmfindsPressed,
          ]}>
          <Image
            source={
              !travlPiinsAmfindsDone
                ? require('../../assets/imgs/photoAdd.png')
                : require('../../assets/imgs/photoAddDim.png')
            }
          />
          <Text
            style={[
              styles.travlPiinsAmfindsCaptureTxt,
              travlPiinsAmfindsDone && styles.travlPiinsAmfindsCaptureTxtDone,
            ]}>
            {travlPiinsAmfindsDone ? 'Add Another Photo' : 'Add Photo'}
          </Text>
        </Pressable>
      </View>
    );
  };

  const travlPiinsAmfindsRenderBoard = () => {
    const travlPiinsAmfindsUniqueTasks = travlPiinsAmfindsCompletedCount;

    if (travlPiinsAmfindsPhotos.length === 0) {
      return (
        <View style={styles.travlPiinsAmfindsEmpty}>
          <View style={styles.travlPiinsAmfindsEmptyFrame}>
            <Image
              source={require('../../assets/imgs/photoEmpty.png')}
            />
          </View>
          <Text style={styles.travlPiinsAmfindsEmptyTitle}>Board is empty</Text>
          <Text style={styles.travlPiinsAmfindsEmptySub}>
            Tap the + button to add your first photo.
          </Text>
          <Pressable
            onPress={() => settravlPiinsAmfindsSelectTaskOpen(true)}
            style={({pressed}) => [
              styles.travlPiinsAmfindsFirstPhotoBtn,
              pressed && styles.travlPiinsAmfindsPressed,
            ]}>
            <Image
              source={require('../../assets/imgs/photoAdd.png')}
            />
            <Text style={styles.travlPiinsAmfindsFirstPhotoTxt}>
              Add First Photo
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <>
        <View style={styles.travlPiinsAmfindsBoardHead}>
          <Text style={styles.travlPiinsAmfindsBoardTitle}>
            My Amazing Board
          </Text>
          <View style={styles.travlPiinsAmfindsBoardHeadBtns}>
            <Pressable
              onPress={() =>
                settravlPiinsAmfindsBoardEdit(!travlPiinsAmfindsBoardEdit)
              }
              style={({pressed}) => [
                styles.travlPiinsAmfindsEditIconBtn,
                pressed && styles.travlPiinsAmfindsPressed,
              ]}>
              <Image
                source={require('../../assets/imgs/photoEdit.png')}
              />
            </Pressable>
            {travlPiinsAmfindsBoardEdit ? (
              <Pressable
                onPress={() => settravlPiinsAmfindsBoardEdit(false)}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsDoneEditBtn,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Text style={styles.travlPiinsAmfindsDoneEditX}>✕</Text>
                <Text style={styles.travlPiinsAmfindsDoneEditTxt}>Done</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
        <View style={styles.travlPiinsAmfindsGrid}>
          {travlPiinsAmfindsPhotos.map(photo => {
            const task = travlPiinsAmfindsFindHuntTask(
              photo.travlPiinsAmfindsTaskId,
            );
            return (
              <Pressable
                key={photo.travlPiinsAmfindsId}
                disabled={travlPiinsAmfindsBoardEdit}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsGridCard,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Image
                  source={{uri: photo.travlPiinsAmfindsUri}}
                  style={styles.travlPiinsAmfindsGridImg}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.85)']}
                  style={styles.travlPiinsAmfindsGridGrad}
                />
                <View style={styles.travlPiinsAmfindsGridText}>
                  <Text
                    style={styles.travlPiinsAmfindsGridTitle}
                    numberOfLines={2}>
                    {task?.travlPiinsAmfindsTitle ?? 'Photo'}
                  </Text>
                  <Text style={styles.travlPiinsAmfindsGridDate}>
                    {travlPiinsAmfindsFormatBoardDate(
                      photo.travlPiinsAmfindsCreatedAt,
                    )}
                  </Text>
                </View>
                {travlPiinsAmfindsBoardEdit ? (
                  <Pressable
                    onPress={() => settravlPiinsAmfindsDeletePhoto(photo)}
                    style={({pressed}) => [
                      styles.travlPiinsAmfindsGridDelete,
                      pressed && styles.travlPiinsAmfindsPressed,
                    ]}
                    hitSlop={8}>
                    <Image
                      source={require('../../assets/imgs/deleteIcon.png')}
                      style={styles.travlPiinsAmfindsGridDeleteImg}
                      resizeMode="contain"
                    />
                  </Pressable>
                ) : null}
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.travlPiinsAmfindsBoardFooter}>
          {travlPiinsAmfindsPhotos.length} photo
          {travlPiinsAmfindsPhotos.length === 1 ? '' : 's'} ·{' '}
          {travlPiinsAmfindsUniqueTasks} task
          {travlPiinsAmfindsUniqueTasks === 1 ? '' : 's'} completed
        </Text>
      </>
    );
  };

  return (
    <View style={styles.travlPiinsAmfindsScreen}>
      <TravlPiinsAmfindslayt>
        <View
          style={[
            styles.travlPiinsAmfindsRoot,
            {
              paddingTop: travlPiinsAmfindsInsets.top,
              paddingBottom:
                (travlPiinsAmfindsTab === 'board' ? 88 : 24) +
                travlPiinsAmfindsInsets.bottom,
            },
          ]}>
          <View style={styles.travlPiinsAmfindsHeader}>
            <Text style={styles.travlPiinsAmfindsKicker}>Photo Hunt</Text>
            <Text style={styles.travlPiinsAmfindsH1}>Amazing Board</Text>
            <View style={styles.travlPiinsAmfindsProgressTrack}>
              <View
                style={[
                  styles.travlPiinsAmfindsProgressFillWrap,
                  {width: `${travlPiinsAmfindsProgressPct}%`},
                ]}>
                <LinearGradient
                  colors={['#00C4A8', travlPiinsAmfindsOrange]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.travlPiinsAmfindsProgressFill}
                />
              </View>
            </View>
            <View style={styles.travlPiinsAmfindsProgressMeta}>
              <Text style={styles.travlPiinsAmfindsProgressLbl}>
                {travlPiinsAmfindsCompletedCount}/{travlPiinsAmfindsTotalTasks}{' '}
                tasks completed
              </Text>
              <Text style={styles.travlPiinsAmfindsProgressPct}>
                {travlPiinsAmfindsProgressPct}%
              </Text>
            </View>
          </View>

          <View style={styles.travlPiinsAmfindsSeg}>
            <Pressable
              onPress={() => {
                settravlPiinsAmfindsTab('tasks');
                settravlPiinsAmfindsBoardEdit(false);
              }}
              style={[
                styles.travlPiinsAmfindsSegBtn,
                travlPiinsAmfindsTab === 'tasks' &&
                  styles.travlPiinsAmfindsSegOn,
              ]}>
              <Text
                style={[
                  styles.travlPiinsAmfindsSegTxt,
                  travlPiinsAmfindsTab === 'tasks'
                    ? styles.travlPiinsAmfindsSegTxtOn
                    : styles.travlPiinsAmfindsSegTxtOff,
                ]}>
                🎯 Hunt Tasks
              </Text>
            </Pressable>
            <Pressable
              onPress={() => settravlPiinsAmfindsTab('board')}
              style={[
                styles.travlPiinsAmfindsSegBtn,
                travlPiinsAmfindsTab === 'board' &&
                  styles.travlPiinsAmfindsSegOn,
              ]}>
              <Text
                style={[
                  styles.travlPiinsAmfindsSegTxt,
                  travlPiinsAmfindsTab === 'board'
                    ? styles.travlPiinsAmfindsSegTxtOn
                    : styles.travlPiinsAmfindsSegTxtOff,
                ]}>
                📸 My Board ({travlPiinsAmfindsPhotos.length})
              </Text>
            </Pressable>
          </View>

          {travlPiinsAmfindsTab === 'tasks' ? (
            <View style={styles.travlPiinsAmfindsTaskList}>
              {travlPiinsAmfindsHuntTasks.map(travlPiinsAmfindsRenderTaskCard)}
            </View>
          ) : (
            travlPiinsAmfindsRenderBoard()
          )}
        </View>
      </TravlPiinsAmfindslayt>

      {travlPiinsAmfindsTab === 'board' ? (
        <Pressable
          onPress={() => settravlPiinsAmfindsSelectTaskOpen(true)}
          style={({pressed}) => [
            styles.travlPiinsAmfindsFab,
            {
              bottom: 12 + travlPiinsAmfindsInsets.bottom,
            },
            pressed && styles.travlPiinsAmfindsPressed,
          ]}>
          <Image source={require('../../assets/imgs/addPinIcon.png')} />
        </Pressable>
      ) : null}

      <Modal
        visible={travlPiinsAmfindsSelectTaskOpen}
        transparent
        animationType="slide"
        onRequestClose={() => settravlPiinsAmfindsSelectTaskOpen(false)}>
        <View style={styles.travlPiinsAmfindsSheetOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => settravlPiinsAmfindsSelectTaskOpen(false)}
          />
          <View style={[styles.travlPiinsAmfindsSheet]}>
            <View style={styles.travlPiinsAmfindsSheetGrabber} />
            <View style={styles.travlPiinsAmfindsSheetHead}>
              <Text style={styles.travlPiinsAmfindsSheetTitle}>
                Select a Task
              </Text>
              <Pressable
                onPress={() => settravlPiinsAmfindsSelectTaskOpen(false)}>
                <Text style={styles.travlPiinsAmfindsSheetX}>✕</Text>
              </Pressable>
            </View>
            <Text style={styles.travlPiinsAmfindsSheetHint}>
              Choose which hunt task this photo is for
            </Text>
            <ScrollView
              style={styles.travlPiinsAmfindsSheetScroll}
              contentContainerStyle={styles.travlPiinsAmfindsSheetScrollContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled>
              {travlPiinsAmfindsHuntTasks.map(task => {
                const diff = travlPiinsAmfindsDiffColors(
                  task.travlPiinsAmfindsDifficulty,
                );
                return (
                  <Pressable
                    key={task.travlPiinsAmfindsId}
                    onPress={() =>
                      travlPiinsAmfindsPickImage(task.travlPiinsAmfindsId)
                    }
                    style={({pressed}) => [
                      styles.travlPiinsAmfindsSheetRow,
                      pressed && styles.travlPiinsAmfindsPressed,
                    ]}>
                    <View style={styles.travlPiinsAmfindsSheetRowIcon}>
                      <Image
                        source={require('../../assets/imgs/photoAdd.png')}
                      />
                    </View>
                    <View style={styles.travlPiinsAmfindsSheetRowMid}>
                      <Text style={styles.travlPiinsAmfindsSheetRowTitle}>
                        {task.travlPiinsAmfindsTitle}
                      </Text>
                      <View style={styles.travlPiinsAmfindsSheetRowMeta}>
                        <View
                          style={[
                            styles.travlPiinsAmfindsDiffBadge,
                            {backgroundColor: diff.bg},
                          ]}>
                          <Text
                            style={[
                              styles.travlPiinsAmfindsDiffTxt,
                              {color: diff.color},
                            ]}>
                            {task.travlPiinsAmfindsDifficulty}
                          </Text>
                        </View>
                        <Text style={styles.travlPiinsAmfindsSheetRowType}>
                          {task.travlPiinsAmfindsType}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.travlPiinsAmfindsSheetRowOutline}>
                      <Image
                        source={require('../../assets/imgs/photoHighlight.png')}
                      />
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={travlPiinsAmfindsDeletePhoto !== null}
        transparent
        animationType="fade"
        onRequestClose={() => settravlPiinsAmfindsDeletePhoto(null)}>
        <View style={styles.travlPiinsAmfindsDelOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => settravlPiinsAmfindsDeletePhoto(null)}
          />
          <View style={styles.travlPiinsAmfindsDelCard}>
            <View style={styles.travlPiinsAmfindsDelIconWrap}>
              <Image
                source={require('../../assets/imgs/deleteHandle.png')}
              />
            </View>
            <Text style={styles.travlPiinsAmfindsDelTitle}>Delete Photo?</Text>
            <Text style={styles.travlPiinsAmfindsDelBody}>
              This photo will be removed from your Amazing Board.
            </Text>
            <View style={styles.travlPiinsAmfindsDelActions}>
              <Pressable
                onPress={() => settravlPiinsAmfindsDeletePhoto(null)}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsDelCancel,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Text style={styles.travlPiinsAmfindsDelCancelTxt}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  travlPiinsAmfindsConfirmDelete().catch(() => {});
                }}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsDelDanger,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Text style={styles.travlPiinsAmfindsDelDangerTxt}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TravlPiinsAmfindshunt;

const styles = StyleSheet.create({
  travlPiinsAmfindsScreen: {flex: 1},
  travlPiinsAmfindsRoot: {flexGrow: 1},
  travlPiinsAmfindsPressed: {opacity: 0.9},
  travlPiinsAmfindsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  travlPiinsAmfindsKicker: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  travlPiinsAmfindsH1: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.35,
  },
  travlPiinsAmfindsProgressTrack: {
    height: 4,
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  travlPiinsAmfindsProgressFillWrap: {
    height: '100%',
    minWidth: 4,
  },
  travlPiinsAmfindsProgressFill: {flex: 1, borderRadius: 2},
  travlPiinsAmfindsProgressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  travlPiinsAmfindsProgressLbl: {
    color: travlPiinsAmfindsMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  travlPiinsAmfindsProgressPct: {
    color: travlPiinsAmfindsOrange,
    fontSize: 12,
    fontWeight: '700',
  },
  travlPiinsAmfindsSeg: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    padding: 5,
    gap: 4,
  },
  travlPiinsAmfindsSegBtn: {
    flex: 1,
    borderRadius: 11,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  travlPiinsAmfindsSegOn: {backgroundColor: travlPiinsAmfindsOrange},
  travlPiinsAmfindsSegTxt: {fontSize: 13, fontWeight: '700'},
  travlPiinsAmfindsSegTxtOn: {color: '#111'},
  travlPiinsAmfindsSegTxtOff: {color: travlPiinsAmfindsMuted},
  travlPiinsAmfindsTaskList: {
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 8,
  },
  travlPiinsAmfindsTaskCard: {
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 10,
    overflow: 'hidden',
  },
  travlPiinsAmfindsTaskCardDone: {
    borderColor: travlPiinsAmfindsGreen,
  },
  travlPiinsAmfindsDoneRibbon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: travlPiinsAmfindsGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 14,
    zIndex: 2,
  },
  travlPiinsAmfindsDoneRibbonTxt: {
    color: '#07152a',
    fontSize: 10,
    fontWeight: '800',
  },
  travlPiinsAmfindsTaskTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  travlPiinsAmfindsTaskIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: travlPiinsAmfindsInner,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsTaskIconDone: {
    backgroundColor: 'rgba(38,208,124,0.2)',
  },
  travlPiinsAmfindsTaskIconTxt: {fontSize: 20},
  travlPiinsAmfindsTaskThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: travlPiinsAmfindsInner,
  },
  travlPiinsAmfindsTaskBadges: {flex: 1, gap: 6, flexDirection: 'row'},
  travlPiinsAmfindsDiffBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    height: 22,
    justifyContent: 'center',
    borderRadius: 8,
  },
  travlPiinsAmfindsDiffTxt: {fontSize: 11, fontWeight: '800'},
  travlPiinsAmfindsTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: travlPiinsAmfindsInner,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsTypeTxt: {
    color: travlPiinsAmfindsMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  travlPiinsAmfindsTaskTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },
  travlPiinsAmfindsTaskDesc: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  travlPiinsAmfindsCaptureBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: travlPiinsAmfindsOrange,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 4,
  },
  travlPiinsAmfindsCaptureBtnDone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 4,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsCaptureIcon: {fontSize: 16},
  travlPiinsAmfindsCaptureIconDone: {opacity: 0.6},
  travlPiinsAmfindsCaptureTxt: {
    color: '#111',
    fontSize: 15,
    fontWeight: '800',
  },
  travlPiinsAmfindsCaptureTxtDone: {
    color: travlPiinsAmfindsMuted,
    fontSize: 15,
    fontWeight: '700',
  },
  travlPiinsAmfindsEmpty: {
    paddingHorizontal: 28,
    paddingTop: 32,
    alignItems: 'center',
    gap: 12,
  },
  travlPiinsAmfindsEmptyFrame: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: travlPiinsAmfindsInner,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsEmptyIcon: {fontSize: 36, opacity: 0.45},
  travlPiinsAmfindsEmptyTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 18,
    fontWeight: '800',
  },
  travlPiinsAmfindsEmptySub: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  travlPiinsAmfindsFirstPhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: travlPiinsAmfindsOrange,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 8,
    width: '70%',
    justifyContent: 'center',
  },
  travlPiinsAmfindsFirstPhotoIcon: {fontSize: 16},
  travlPiinsAmfindsFirstPhotoTxt: {
    color: '#111',
    fontSize: 16,
    fontWeight: '800',
  },
  travlPiinsAmfindsBoardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  travlPiinsAmfindsBoardTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 18,
    fontWeight: '800',
  },
  travlPiinsAmfindsBoardHeadBtns: {flexDirection: 'row', gap: 8},
  travlPiinsAmfindsEditIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: travlPiinsAmfindsCard,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsEditIconTxt: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 16,
  },
  travlPiinsAmfindsDoneEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: travlPiinsAmfindsRed,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  travlPiinsAmfindsDoneEditX: {color: '#fff', fontSize: 12, fontWeight: '700'},
  travlPiinsAmfindsDoneEditTxt: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  travlPiinsAmfindsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: travlPiinsAmfindsGridPad,
    gap: travlPiinsAmfindsGridGap,
  },
  travlPiinsAmfindsGridCard: {
    width: travlPiinsAmfindsGridCardW,
    height: travlPiinsAmfindsGridCardW * 1.15,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: travlPiinsAmfindsCard,
  },
  travlPiinsAmfindsGridImg: {width: '100%', height: '100%'},
  travlPiinsAmfindsGridGrad: {
    ...StyleSheet.absoluteFillObject,
  },
  travlPiinsAmfindsGridText: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    gap: 2,
  },
  travlPiinsAmfindsGridTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 13,
    fontWeight: '700',
  },
  travlPiinsAmfindsGridDate: {
    color: travlPiinsAmfindsMuted,
    fontSize: 11,
  },
  travlPiinsAmfindsGridDelete: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: travlPiinsAmfindsRed,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  travlPiinsAmfindsGridDeleteImg: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  travlPiinsAmfindsBoardFooter: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  travlPiinsAmfindsFab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,

    borderRadius: 16,
    backgroundColor: travlPiinsAmfindsOrange,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  travlPiinsAmfindsFabTxt: {
    color: '#111',
    fontSize: 32,
    fontWeight: '300',
    marginTop: -2,
  },
  travlPiinsAmfindsSheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  travlPiinsAmfindsSheet: {
    backgroundColor: '#2A2A2A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    maxHeight: '78%',
  },
  travlPiinsAmfindsSheetGrabber: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(237,243,252,0.22)',
    alignSelf: 'center',
    marginBottom: 14,
  },
  travlPiinsAmfindsSheetHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  travlPiinsAmfindsSheetTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 18,
    fontWeight: '800',
  },
  travlPiinsAmfindsSheetX: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 20,
    padding: 4,
  },
  travlPiinsAmfindsSheetHint: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    marginBottom: 14,
  },
  travlPiinsAmfindsSheetScroll: {maxHeight: 480, marginBottom: 4},
  travlPiinsAmfindsSheetScrollContent: {gap: 10, paddingBottom: 8},
  travlPiinsAmfindsSheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#373737',
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  travlPiinsAmfindsSheetRowIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: travlPiinsAmfindsOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsSheetRowCam: {fontSize: 18},
  travlPiinsAmfindsSheetRowMid: {flex: 1, gap: 6},
  travlPiinsAmfindsSheetRowTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 15,
    fontWeight: '700',
  },
  travlPiinsAmfindsSheetRowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  travlPiinsAmfindsSheetRowType: {
    color: travlPiinsAmfindsMuted,
    fontSize: 12,
  },
  travlPiinsAmfindsSheetRowOutline: {
    fontSize: 16,
    opacity: 0.7,
  },
  travlPiinsAmfindsDelOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  travlPiinsAmfindsDelCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    padding: 22,
    alignItems: 'center',
    gap: 12,
  },
  travlPiinsAmfindsDelIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(239,68,68,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsDelIcon: {fontSize: 22},
  travlPiinsAmfindsDelTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 18,
    fontWeight: '800',
  },
  travlPiinsAmfindsDelBody: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  travlPiinsAmfindsDelActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 8,
  },
  travlPiinsAmfindsDelCancel: {
    flex: 1,
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsDelCancelTxt: {
    color: travlPiinsAmfindsTitleC,
    fontWeight: '700',
  },
  travlPiinsAmfindsDelDanger: {
    flex: 1,
    backgroundColor: travlPiinsAmfindsRed,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  travlPiinsAmfindsDelDangerTxt: {color: '#fff', fontWeight: '700'},
});
