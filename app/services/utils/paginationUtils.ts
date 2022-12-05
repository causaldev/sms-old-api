import _ from 'lodash';

export const parsePage = (pageQuery?: string) => {
  if (!pageQuery) return 1;

  return _.parseInt(pageQuery, 10) || 1;
};

export const parsePageSize = (perPageQuery?: string) => {
  if (!perPageQuery) return 25;

  return _.parseInt(perPageQuery, 10) || 25;
};
