import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import CommentForm from './comment-form';
import {State} from '../../types/state';
import {APIRoute, REVIEW} from '../../const';

const placeholderText = 'Tell how was your stay, what you like and what can be improved';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  {'ROOM': {id: number}},
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const renderCommentForm = (store: MockStore) => {
  render (
    <Provider store={store}>
      <CommentForm />
    </Provider>,
  );
};

describe('Component: CommentForm', () => {
  describe('should render correctly', () => {
    const store = mockStore();
    it('initial rendering', () => {
      renderCommentForm(store);

      const checkboxesElements = screen.getAllByRole('radio') as HTMLInputElement[];
      const isAllcheckboxesNotChecked = checkboxesElements.every((element) => element.checked === false);
      expect(isAllcheckboxesNotChecked).toBeTruthy();
      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    it('should checked radiobox when user click', () => {
      renderCommentForm(store);

      const checkboxesElements = screen.getAllByRole('radio');
      const testingElement = checkboxesElements[1] as HTMLInputElement;
      userEvent.click(testingElement);

      expect(testingElement.checked).toBeTruthy();
    });

    it('should render user text when user input it', () => {
      const userText = 'Rendering test pass successfuly';

      renderCommentForm(store);

      const textAreaElement = screen.getByTestId('room-comment-text') as HTMLTextAreaElement;
      userEvent.type(textAreaElement, userText);

      expect(screen.getByText(userText)).toBeInTheDocument();
    });
  });

  describe('should correctly render submit button:', () => {
    const store = mockStore();
    it('to be disabled when the rating is set but the text is not long enough', () => {
      const userText = 'A'.repeat(REVIEW.MinLength - 1);
      renderCommentForm(store);

      const checkboxesElements = screen.getAllByRole('radio');
      const testingElement = checkboxesElements[1] as HTMLInputElement;
      userEvent.click(testingElement);

      const textAreaElement = screen.getByTestId('room-comment-text') as HTMLTextAreaElement;
      userEvent.type(textAreaElement, userText);

      const submitBattonElement = screen.getByTestId('submit') as HTMLButtonElement;
      expect(submitBattonElement.disabled).toBeTruthy();
    });

    it('to be disabled when the text is long enough but the rating is not set', () => {
      const userText = 'A'.repeat(REVIEW.MinLength);
      renderCommentForm(store);

      const textAreaElement = screen.getByTestId('room-comment-text') as HTMLTextAreaElement;
      userEvent.type(textAreaElement, userText);

      const submitBattonElement = screen.getByTestId('submit') as HTMLButtonElement;
      expect(submitBattonElement.disabled).toBeTruthy();
    });

    it('to be enabled when the rating is set and the text is long enough', () => {
      const userText = 'A'.repeat(REVIEW.MinLength);
      renderCommentForm(store);

      const checkboxesElements = screen.getAllByRole('radio');
      const testingElement = checkboxesElements[1] as HTMLInputElement;
      userEvent.click(testingElement);

      const textAreaElement = screen.getByTestId('room-comment-text') as HTMLTextAreaElement;
      userEvent.type(textAreaElement, userText);

      const submitBattonElement = screen.getByTestId('submit') as HTMLButtonElement;
      expect(submitBattonElement.disabled).toBeFalsy();
    });
  });

  describe('should correctly render after submitting', () => {
    it('empty form if data was submitted successfully', async () => {
      const userText = 'A'.repeat(REVIEW.MinLength);
      const roomId = 1;

      const store = mockStore({ROOM: {id: roomId}});
      mockAPI
        .onPost(`${APIRoute.Comments}/${roomId}`)
        .reply(200, {});

      renderCommentForm(store);

      const checkboxesElements = screen.getAllByRole('radio') as HTMLInputElement[];
      const testingElement = checkboxesElements[1] as HTMLInputElement;
      userEvent.click(testingElement);

      const textAreaElement = screen.getByTestId('room-comment-text') as HTMLTextAreaElement;
      userEvent.type(textAreaElement, userText);

      const submitBattonElement = screen.getByTestId('submit') as HTMLButtonElement;
      userEvent.click(submitBattonElement);

      expect(await screen.findByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    it('comment if data was submitted unsuccessfully', async () => {
      const userText = 'A'.repeat(REVIEW.MinLength);
      const roomId = 1;

      const store = mockStore({ROOM: {id: roomId}});
      mockAPI
        .onPost(`${APIRoute.Comments}/${roomId}`)
        .reply(400, {});

      renderCommentForm(store);

      const checkboxesElements = screen.getAllByRole('radio') as HTMLInputElement[];
      const testingElement = checkboxesElements[1] as HTMLInputElement;
      userEvent.click(testingElement);

      const textAreaElement = screen.getByTestId('room-comment-text') as HTMLTextAreaElement;
      userEvent.type(textAreaElement, userText);

      const submitBattonElement = screen.getByTestId('submit') as HTMLButtonElement;
      userEvent.click(submitBattonElement);

      await screen.findAllByRole('radio')
        .then((radioboxes) => {
          const testingRadioElement = radioboxes[1] as HTMLInputElement;
          expect(testingRadioElement.checked).toBeTruthy();
        });

      expect(await screen.findByText(userText)).toBeInTheDocument();
    });
  });
});
