import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import { Support } from '../typings';
type Props = Support;
const Card: FunctionalComponent<Props> = props => (
  <Container>
    <h2>{props['サービス名称']}</h2>
    <div className="description">{props['詳細']}</div>
    <div className="from">{'提供: ' + props['企業等']}</div>
    <div className="fee">{'費用等:' + props['無料/有料']}</div>
    <div className="span">
      {'提供期間:' +
        props['開始日'] +
        '〜' +
        props['終了日'] +
        props['期間備考']}
    </div>
    <div className="type">{props['分野']}</div>
    <div className="service">{props['サービス分類']}</div>
    <div className="keyword">{props['キーワード']}</div>
    <div className="target">{props['対象者']}</div>
    <div className="url">
      <a href={props.URL} target="_blank" rel="noopener noreferrer">
        アクセスしてみる
      </a>
    </div>
  </Container>
);

const Container = styled.div`
  background-color: #f5f5f5;
  padding: 1em;
  margin: 1em;
  line-height: 1.8em;
  > h2 {
    background-color: #f7f8f4;
    padding: 0.2em 0em 0.5em 0em;
    margin: 0;
  }
  > div.description {
    margin-bottom: 0.8em;
  }
  > div.tags {
    text-align: center;
    margin: 0.6em;
    > div {
      display: inline-block;
      border: 1px solid black;
      padding: 0 0.3em;
      font-size: 80%;
      line-height: 1.8em;
      background-color: white;
      margin: 0.5em 0.2em;
      cursor: pointer;
    }
  }
  > div.url {
    background-color: #f6c744;
    border-radius: 2vw;
    font-weight: bold;
    text-align: center;
    padding: 0.5em;
    margin-bottom: 1em;
    > a {
      display: block;
      text-decoration: none;
      color: black !important;
    }
  }
`;

export default Card;
