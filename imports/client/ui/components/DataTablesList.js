import React, { Component } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import ReactDataGrid from 'react-data-grid';
import BootstrapPaginator from 'react-bootstrap-pagination';
import PropTypes from 'prop-types';
import IdCell from './IdCell';
import container from '../../../modules/container';
import Loading from '../components/Loading';

class DataTablesList extends Component {
  constructor(props) {
    super(props);

    this.pageLimits = [10, 25, 50, 100];
  }

  limitChange = (event) => {
    event.preventDefault();

    const {
      pagination,
    } = this.props;

    pagination.perPage(parseInt(this.perPageSelect.value, 10));
  };

  searchItems = (event) => {
    event.preventDefault();

    const {
      pagination,
    } = this.props;

    const searchTerm = this.search.value.trim();
    pagination.filters(
      {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { body: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    );

    pagination.currentPage(1);
  };

  gridSort = (sortColumn, sortDirection) => {
    const {
      pagination,
    } = this.props;

    const sort = {};
    switch (sortDirection) {
      case 'ASC':
        sort[sortColumn] = 1;
        break;

      case 'DESC':
        sort[sortColumn] = -1;
        break;

      default:
        break;
    }

    pagination.sort(sort);
  };

  render() {
    const {
      documents,
      pagination,
    } = this.props;

    const columns = [
      { key: '_id', name: 'ID', formatter: <IdCell />, sortable: true },
      { key: 'title', name: 'Title', sortable: true },
      { key: 'body', name: 'Body' },
    ];

    const tableHeight = (35 * (documents.length + 1)) + 2;

    let showingFrom = (pagination.currentPage() * pagination.perPage()) - pagination.perPage();
    showingFrom = (showingFrom === 0) ? 1 : showingFrom;

    let showingTo = pagination.currentPage() * pagination.perPage();
    if (pagination.currentPage() === pagination.totalPages()) {
      showingTo = pagination.totalItems();
    }

    return (
      documents.length > 0 ? (
        <div className="row">
          <Row>
            <Col xs={6}>
              <div className="text-right">
                <label htmlFor="per-page">
                  Per page:
                  <select ref={(c) => { this.perPageSelect = c; }} name="per-page" defaultValue={pagination.perPage()} className="form-control input-sm" onChange={this.limitChange} >
                    {this.pageLimits.map(limit => (
                      <option key={limit} value={limit}>{limit}</option>
                    ))}
                  </select>
                </label>
              </div>
            </Col>
            <Col xs={6}>
              <div className="text-right">
                <label htmlFor="search">
                  <input
                    name="search"
                    ref={(c) => { this.search = c; }}
                    type="search"
                    className="form-control input-sm"
                    placeholder="Search..."
                  />
                </label>
                <Button bsStyle="success" className="pull-right" onClick={this.searchItems}>
                  Search
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ReactDataGrid
                columns={columns}
                rowGetter={i => (documents[i])}
                rowsCount={documents.length}
                minHeight={tableHeight}
                onGridSort={this.gridSort}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <div className="pagination">
                Showing {showingFrom} to {showingTo} of {pagination.totalItems()} entries
              </div>
            </Col>
            <Col xs={8}>
              <BootstrapPaginator
                pagination={pagination}
                limit={10}
                containerClass="text-right"
              />
            </Col>
          </Row>
        </div>
      ) : <Alert bsStyle="warning">No documents yet.</Alert>
    );
  }
}

DataTablesList.defaultProps = {
  documents: [],
  pagination: null,
};

DataTablesList.propTypes = {
  documents: PropTypes.array,
  pagination: PropTypes.object,
};

export default container((props, onData) => {
  if (props.pagination.ready()) {
    const documents = props.pagination.getPage();
    const totalPages = props.pagination.totalPages();
    onData(null, { documents, totalPages });
  }
}, DataTablesList, { loadingHandler: () => <Loading /> });
