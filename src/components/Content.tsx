/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import media from 'styled-media-query';
import { AppContainer } from '../containers';
import { Card } from '.';
import { LAYOUT_WIDTH } from '../constants';
import { Colors, Categories, Targets } from '../shared';
import SupportList from '../../data/supports.json';

const CheckLoadStatus: FunctionalComponent = () => {
  const {
    word,
    target,
    category,
    filteredSupports,
    handleSetCategory,
    handleSetTarget,
  } = AppContainer.useContainer();
  return (
    <Layout>
      <div>
        <div className="checks">
          {Targets.map((targetItem, i) => (
            <div>
              <label key={i}>
                <input
                  type="checkbox"
                  value={targetItem.value}
                  onClick={() =>
                    handleSetTarget(
                      target === targetItem.value ? null : targetItem.value,
                    )
                  }
                  checked={target === targetItem.value}
                />
                {targetItem.name}
              </label>
            </div>
          ))}
        </div>
        <div className="categories">
          {Categories.map(ct => (
            <div
              key={ct.color}
              style={{
                backgroundColor: ct.color,
                opacity: ct.name === category ? '0.7' : '1.0',
              }}
              onClick={() =>
                handleSetCategory(category === ct.name ? null : ct.name)
              }
            >
              {ct.name}
            </div>
          ))}
        </div>
        {!SupportList || (word && !filteredSupports && <p>何もありません</p>)}
        {!word &&
          !target &&
          !category &&
          SupportList &&
          SupportList.map((item, i) => <Card key={i} {...item} />)}
        {filteredSupports && (
          <div>
            <span>該当件数: {filteredSupports.length}件</span>
            <div className="content">
              {filteredSupports.map((item, i) => (
                <Card key={i} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${Colors.bgLightGray};
  min-height: 100vh;
  padding: 16px 0;
  > div {
    margin: 0 auto;
    max-width: ${LAYOUT_WIDTH}px;
    margin-bottom: 24px;
    > .checks {
      padding-top: 20px;
      > div {
        display: inline-block;
        margin-right: 6px;
        > label {
          display: flex;
          align-items: center;
          letter-spacing: 0.2;
          color: ${Colors.textBlack};
          > input {
            margin-right: 2px;
            height: 20px !important;
            width: 20px !important;
          }
          margin-right: 4px;
          color: ${Colors.textBlack};
        }
      }
    }
    > .categories {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 24px;
      > div {
        cursor: pointer;
        color: white;
        padding: 4px 8px;
        display: inline-block;
        border-radius: 4px;
        margin-right: 8px;
        margin-top: 8px;
      }
    }
    > .loader {
      width: 100%;
      > img {
        filter: invert(50%) sepia(0%) saturate(11%) hue-rotate(143deg)
          brightness(101%) contrast(93%);
        margin: 120px auto;
        width: 80px;
        height: 80px;
      }
    }
    span {
      font-weight: bold;
    }
    .content {
      margin-top: 30px 60px;
    }
  }
  ${media.lessThan('medium')`
    padding: 0 16px;
    div {
      > .categories {
        padding-top: 14px;
      }
    }
  `}
  ${media.lessThan('small')`
    div {
      > .checks {
        text-align: center;
      }
      > .categories {
        overflow: auto;
        flex-wrap: nowrap;
        > div {
          min-width: 164px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  `}
`;

export default CheckLoadStatus;
