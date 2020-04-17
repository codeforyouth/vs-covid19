/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { h, FunctionalComponent } from 'preact';
import { useCallback } from 'preact/hooks';
import { Link } from 'preact-router/match';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Search from '@material-ui/icons/Search';
import Description from '@material-ui/icons/Description';
import NewTab from '@material-ui/icons/OpenInNew';
import Undo from '@material-ui/icons/Replay';
import { Colors, breakPoints } from '../shared';

const Header: FunctionalComponent<{ path: string | undefined }> = props => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <Wrapper centered={props.path === '/about'}>
      <div>
        {props.path !== '/about' && (
          <span onClick={scrollToTop}>VS COVID-19</span>
        )}
        <ul>
          <li>
            {props.path !== '/about' ? (
              <Link href="/about">
                <Description />
                このサイトについて
              </Link>
            ) : (
              <Link href="/">
                <Undo />
                トップに戻る
              </Link>
            )}
          </li>
          <li>
            <a
              href="https://covid19-business-support.now.sh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Search />
              事業者向け支援情報を探す
              <NewTab className="small" />
            </a>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default Header;

type StyleProps = { centered: boolean };
const Wrapper = styled.div<StyleProps>`
  display: block;
  position: sticky;
  top: 0;
  width: 100vw;
  height: 60px;
  color: ${Colors.white};
  background-color: ${Colors.purple};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.12);
  z-index: 5;
  > div {
    display: flex;
    align-items: center;
    max-width: 1080px;
    height: 100%;
    margin: 0 auto;
    > span {
      ${media.lessThan('small')`
        display: none;
      `}
      cursor: pointer;
      color: ${Colors.white};
      font-weight: bold;
      > a {
        color: ${Colors.white};
        font-weight: bold;
      }
    }
    > ul {
      flex-direction: row;
      display: flex;
      margin-left: auto;
      ${media.lessThan('small')`
        width: 100vw;
        justify-content: center;
      `}
      ${({ centered }: StyleProps) =>
        centered &&
        css`
          width: 100vw;
          justify-content: center;
        `}
      > li {
        cursor: pointer;
        &:nth-of-type(n + 2) {
          margin-left: 20px;
          ${media.lessThan('small')`
            margin-left: 8px;
          `}
        }
        > a {
          display: flex;
          align-items: center;
          ${media.lessThan('small')`
            font-size: 12px;
          `}
          ${breakPoints.lessThan('xs')`
            font-size: 12px;
          `}
          > svg {
            color: ${Colors.white};
            margin: 0 4px;
            width: 20px;
            height: 20px;
            ${media.lessThan('small')`
              width: 18px;
              height: 18px;
            `}
            &.small {
              color: ${Colors.white};
              margin: 0 4px;
              width: 14px;
              height: 14px;
              ${media.lessThan('small')`
                width: 12px;
                height: 12px;
              `}
            }
          }
          color: ${Colors.white};
        }
      }
    }
  }
`;
