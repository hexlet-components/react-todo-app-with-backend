// @ts-check

import { Loader as MantineLoader, VisuallyHidden } from "@mantine/core";

// `output` вместо `<div role="status">`: семантический тег несёт ту же роль
// для скринридеров, и правило jsx-a11y(prefer-tag-over-role) просит именно его.
const Loader = () => (
  <output>
    <MantineLoader color="green" size="sm" />
    <VisuallyHidden>Loading...</VisuallyHidden>
  </output>
);

export default Loader;
