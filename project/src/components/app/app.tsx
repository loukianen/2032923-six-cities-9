import MainPage from '../main-page/main-page';

type AppProps = {
  advertsAmount: number,
};

function App(props: AppProps): JSX.Element {
  const { advertsAmount } = props;
  return <MainPage advertsAmount={advertsAmount} />;
}

export default App;
