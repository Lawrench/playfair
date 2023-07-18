test("renders cipher message correctly", () => {
  const message = "Hello, world!";
  const { getByText } = render(<Cipher message={message} />);
  const cipherElement = getByText(`Cipher: ${message}`);
  expect(cipherElement).toBeInTheDocument();
});
