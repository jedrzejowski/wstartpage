import {memo, FC} from 'react';
import {
  tileMutActions,
  normalizedTileCollectionSlice,
  useNormalizedTileSection
} from '../../data/slice/normalizedTileCollections';
import {useAppDispatch} from '../../data/hooks';
import {FlexExpand, HFlexContainer, PaddedRoot} from '../UtilityElements';
import Button from '../input/Button';
import TextInput from '../input/TextInput';
import type {NormalizedTileSectionT} from '../../data/tileCollection';
import NumberInput from '../input/NumberInput';
import MdiIcon from '../MdiIcon';

const TileSectionEditForm: FC<{
  sectionId: string;
}> = ({sectionId}) => {
  const section = useNormalizedTileSection(sectionId);
  const dispatch = useAppDispatch();

  if (!section) {
    return null;
  }

  return <PaddedRoot>

    <HFlexContainer>
      <Button onClick={handleMoveToLeftClick}>
        <MdiIcon icon="arrow-left"/>
      </Button>
      <FlexExpand/>
      <Button onClick={handleDeleteClick}>
        <MdiIcon icon="delete" color="red"/>
      </Button>
      <FlexExpand/>
      <Button onClick={handleMoveToRightClick}>
        <MdiIcon icon="arrow-right"/>
      </Button>
    </HFlexContainer>

    <TextInput label="Tytuł" value={section.title} onValueChange={handleChangeFactory('title')}/>
    <NumberInput label="Kolejność" value={section.order} onValueChange={handleChangeFactory('order')}/>
  </PaddedRoot>;

  function handleChangeFactory(field: keyof NormalizedTileSectionT) {
    return (newValue: any) => {
      if (!section) {
        return null;
      }

      const newSection = {
        ...section,
        [field]: newValue,
      };

      dispatch(tileMutActions.updateTileSection({sectionId, section: newSection}));
    };
  }

  function handleMoveToLeftClick() {
    dispatch(normalizedTileCollectionSlice.actions.moveIconSection({sectionId, offset: -1}));
  }

  function handleDeleteClick() {
    dispatch(normalizedTileCollectionSlice.actions.deleteTileSection({sectionId}));
  }

  function handleMoveToRightClick() {
    dispatch(normalizedTileCollectionSlice.actions.moveIconSection({sectionId, offset: 1}));
  }
};


export default memo(TileSectionEditForm);
